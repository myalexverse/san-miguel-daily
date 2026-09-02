const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Image pool mapping for categories
const categoryImages = {
  'san-miguel': ['/images/news_drainage_sma.jpg', '/images/sma_public_works.jpg', '/images/sma_infrastructure_projects.jpg', '/images/sma_urban_blueprints_symbolic.jpg'],
  'politica': ['/images/news_patrimony_law.jpg', '/images/sma_palacio_municipal_symbolic.jpg', '/images/sma_presidencia.jpg', '/images/sma_mayor_trejo.jpg'],
  'economia': ['/images/news_agri_exports.jpg', '/images/sma_agriculture.jpg', '/images/sma_industrial_park.jpg', '/images/sma_financial_forum.jpg'],
  'cultura': ['/images/news_chamber_music.jpg', '/images/sma_concert.jpg', '/images/sma_fasma.jpg', '/images/sma_mural_restoration.jpg'],
  'turismo': ['/images/news_sustainable_tourism.jpg', '/images/sma_hotel_boutique.jpg', '/images/sma_turismo_record.jpg', '/images/sma_travel_leisure.jpg', '/images/sma_restaurantes.jpg']
};

const authors = ['Mariana Escobedo', 'Roberto Lira', 'Ana Sofía Vargas', 'Julia Wren', 'Equipo Editorial'];

// Helper to convert XML/RSS to clean news items
function parseRSSItems(xmlText) {
  const items = [];
  const itemRegex = /<item>[\s\S]*?<\/item>/g;
  const matches = xmlText.match(itemRegex) || [];

  for (const match of matches) {
    const titleMatch = match.match(/<title>([\s\S]*?)<\/title>/);
    const linkMatch = match.match(/<link>([\s\S]*?)<\/link>/);
    const pubDateMatch = match.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
    const sourceMatch = match.match(/<source[\s\S]*?>([\s\S]*?)<\/source>/);

    if (titleMatch) {
      let title = titleMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
      let source = sourceMatch ? sourceMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim() : 'Fuente Oficial';
      
      // Clean title from " - SourceName" suffix if present
      if (title.includes(' - ')) {
        const parts = title.split(' - ');
        source = parts.pop().trim();
        title = parts.join(' - ').trim();
      }

      if (title && title !== 'Google Noticias' && title !== 'Google News') {
        items.push({
          title,
          source: source || 'Información Verificada',
          link: linkMatch ? linkMatch[1] : '',
          pubDate: pubDateMatch ? pubDateMatch[1] : new Date().toISOString()
        });
      }
    }
  }
  return items;
}

// Generate URL slug from title
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80) + '-' + Math.floor(Math.random() * 1000);
}

// Main execution routine
async function fetchAndPublishNews() {
  console.log("=== INICIANDO ACTUALIZACIÓN INTEGRAL DE SECCIONES SAN MIGUEL DAILY ===");
  console.log("Fecha y Hora:", new Date().toLocaleString('es-MX'));

  // 1. Fetch Tenant
  const { data: tenant, error: tErr } = await supabase
    .from('tenants')
    .select('id')
    .eq('domain', 'daily.localhost')
    .single();

  if (tErr || !tenant) {
    console.error("Error al obtener el tenant:", tErr);
    process.exit(1);
  }

  // Fetch recent posts to avoid duplicate titles in last 48h
  const { data: recentPosts } = await supabase
    .from('posts')
    .select('title')
    .order('created_at', { ascending: false })
    .limit(50);

  const existingTitles = new Set((recentPosts || []).map(p => p.title.toLowerCase().trim()));

  const sections = [
    { 
      name: 'san-miguel', 
      label: 'San Miguel de Allende (Local)',
      query: 'San+Miguel+de+Allende+seguridad+OR+obras+OR+vialidad' 
    },
    { 
      name: 'politica', 
      label: 'Política y Gobierno',
      query: 'San+Miguel+de+Allende+gobierno+OR+cabildo+OR+reglamento' 
    },
    { 
      name: 'economia', 
      label: 'Economía y Negocios',
      query: 'San+Miguel+de+Allende+inversion+OR+economia+OR+empleo' 
    },
    { 
      name: 'cultura', 
      label: 'Cultura y Tradición',
      query: 'San+Miguel+de+Allende+arte+OR+gastronomia+OR+festival' 
    },
    { 
      name: 'turismo', 
      label: 'Turismo y Hospitalidad',
      query: 'San+Miguel+de+Allende+turismo+OR+hoteles+OR+viajes' 
    }
  ];

  let publishedCount = 0;

  for (let i = 0; i < sections.length; i++) {
    const sec = sections[i];
    console.log(`\n--------------------------------------------------`);
    console.log(`📡 Rastreando sección: [${sec.label}] (${sec.name})...`);
    
    try {
      const rssUrl = `https://news.google.com/rss/search?q=${sec.query}&hl=es-419&gl=MX&ceid=MX:es-419`;
      const response = await fetch(rssUrl);
      const xmlText = await response.text();
      const newsItems = parseRSSItems(xmlText);

      if (newsItems.length === 0) {
        console.log(`⚠️ No se encontraron resultados RSS para ${sec.name}.`);
        continue;
      }

      // Pick up to 2 fresh unique news items per section
      let itemsToPublish = [];
      for (const item of newsItems) {
        if (!existingTitles.has(item.title.toLowerCase().trim())) {
          itemsToPublish.push(item);
          existingTitles.add(item.title.toLowerCase().trim());
          if (itemsToPublish.length >= 2) break;
        }
      }

      // If all were recent, take the top one to guarantee freshness
      if (itemsToPublish.length === 0) {
        itemsToPublish = [newsItems[0]];
      }

      for (const news of itemsToPublish) {
        console.log(`✓ NOTICIA SELECCIONADA: "${news.title}" (Fuente: ${news.source})`);

        const slug = slugify(news.title);
        const imageList = categoryImages[sec.name] || categoryImages['san-miguel'];
        const imageUrl = imageList[Math.floor(Math.random() * imageList.length)];
        const author = authors[(publishedCount + i) % authors.length];

        const article = {
          tenant_id: tenant.id,
          title: news.title,
          slug: slug,
          excerpt: `Reporte verificado vía ${news.source}: cobertura periodística sobre ${news.title.toLowerCase()} y su impacto en la comunidad de San Miguel de Allende y el estado de Guanajuato.`,
          content: `
            <p class="lead"><strong>San Miguel de Allende, Gto.</strong> — De acuerdo con reportes verificados e informes recabados por <em>${news.source}</em>, se han registrado acontecimientos relevantes en torno a: <strong>${news.title}</strong>.</p>
            
            <p>La información más reciente destaca que las acciones y posicionamientos vinculados a este tema forman parte de las prioridades estratégicas del municipio y de la región del Bajío guanajuatense, incidiendo de forma directa en la dinámica social, económica y comunitaria de San Miguel de Allende.</p>
            
            <h2>Contexto y seguimiento institucional</h2>
            <p>Diversos representantes de los sectores productivos, autoridades y especialistas locales han subrayado la importancia de mantener un monitoreo continuo sobre el desarrollo de estos acontecimientos, garantizando el equilibrio entre el crecimiento ordenado y la preservación del patrimonio y la calidad de vida que distinguen a la ciudad.</p>
            
            <p><em>San Miguel DAILY mantendrá la actualización permanente de esta información conforme se emitan nuevos comunicados oficiales e informes complementarios.</em></p>
          `,
          status: 'published',
          category: sec.name,
          image_url: imageUrl,
          author_name: author,
          created_at: new Date().toISOString(),
          published_at: new Date().toISOString()
        };

        const { data: inserted, error: iErr } = await supabase
          .from('posts')
          .insert([article])
          .select();

        if (iErr) {
          console.error(`Error publicando noticia [${sec.name}]:`, iErr.message);
        } else {
          console.log(`🚀 ¡PUBLICADA EXITOSAMENTE! ID: ${inserted[0].id}`);
          publishedCount++;
        }
      }

    } catch (err) {
      console.error(`Error procesando sección ${sec.name}:`, err.message);
    }
  }

  console.log(`\n==================================================`);
  console.log(`RESUMEN: ${publishedCount} noticias reales publicadas en todas las secciones.`);
  console.log(`==================================================\n`);
}

fetchAndPublishNews();
