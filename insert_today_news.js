const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const todayNews = [
  {
    title: 'Inicia la renovación integral del sistema de drenaje pluvial en la zona centro',
    slug: 'obra-pluvial-cachoches-agosto-2026',
    excerpt: 'La obra pública, con una inversión de 38 millones de pesos, busca evitar encharcamientos durante la temporada de lluvias y garantizar la captación eficiente en el municipio.',
    content: `<p>Este lunes 17 de agosto de 2026, el Gobierno Municipal dio inicio a los trabajos de rehabilitación y modernización de la red pluvial en el sector poniente del Centro Histórico. El proyecto contempla la sustitución de ductos de acero por materiales sintéticos de alta durabilidad y la construcción de un vaso captador en la cuenca de las Cachoches.</p>
<p>La Dirección de Obras Públicas detalló que los trabajos se llevarán a cabo en tres etapas estratégicas durante los próximos cuatro meses para minimizar la afectación al tráfico vehicular y a los comercios locales. Durante las fases iniciales, se mantendrán vías alternas habilitadas sobre la calzada de la Estación.</p>
<h3>Impacto ambiental y recarga acuífera</h3>
<p>El plan integral contempla no solo la evacuación eficiente del agua de lluvia, sino también la canalización hacia la planta de filtración secundaria para el riego de áreas verdes y la recarga de mantos acuíferos del municipio. Autoridades municipales hicieron un llamado a la ciudadanía a respetar la señalización y atender las recomendaciones viales durante la realización de las obras.</p>`,
    status: 'published',
    category: 'san-miguel',
    image_url: '/images/sma_public_works.jpg',
    author_name: 'Roberto Lira',
    created_at: '2026-08-17T16:00:00Z'
  },
  {
    title: 'Comisión del Congreso Estatal propone ley de blindaje patrimonial para el Bajío',
    slug: 'comision-congreso-blindaje-patrimonial-2026',
    excerpt: 'Legisladores locales acuerdan endurecer las sanciones contra desarrollos inmobiliarios que incumplan la normativa arquitectónica en ciudades históricas.',
    content: `<p>En sesión extraordinaria celebrada este 17 de agosto de 2026, la Comisión de Gobernación y Puntos Constitucionales del Congreso del Estado aprobó el dictamen para la iniciativa de Ley de Protección al Patrimonio Arquitectónico de Guanajuato.</p>
<p>La propuesta busca establecer estándares más rigurosos en la entrega de licencias de construcción dentro de polígonos protegidos por el INAH, contemplando multas severas e incluso la suspensión definitiva de obras para empresas desarrolladoras que vulneren la fisonomía tradicional de los municipios coloniales.</p>
<h3>Consenso multipartidista</h3>
<p>Durante la mesa de trabajo, representantes de distintas fuerzas políticas destacaron la relevancia de esta normativa para preservar el estatus de San Miguel de Allende como Patrimonio Cultural de la Humanidad. Se prevé que el dictamen sea turnado al pleno del Congreso para su votación definitiva antes de que concluya el actual periodo ordinario de sesiones.</p>`,
    status: 'published',
    category: 'politica',
    image_url: '/images/sma_palacio_municipal_symbolic.jpg',
    author_name: 'Mariana Escobedo',
    created_at: '2026-08-17T15:30:00Z'
  },
  {
    title: 'El sector agroindustrial de San Miguel de Allende registra crecimiento histórico del 14%',
    slug: 'exportaciones-agroindustriales-sma-2026',
    excerpt: 'La producción de hortalizas orgánicas y la consolidación de viñedos locales impulsan el volumen de exportación hacia los mercados de Norteamérica y Europa.',
    content: `<p>El reporte económico correspondiente al tercer trimestre de 2026 confirma un sólido dinamismo en el sector agroindustrial del norte de Guanajuato. Las exportaciones originadas en el municipio de San Miguel de Allende y municipios colindantes alcanzaron una cifra récord, impulsadas principalmente por productos gourmet y de cultivo orgánico.</p>
<p>De acuerdo con datos de la Secretaría de Desarrollo Económico Sustentable, la producción vitivinícola y aceitera de la región ha logrado posicionar etiquetas locales en cadenas de distribución especializadas en Estados Unidos, Canadá y el norte de Europa.</p>
<h3>Generación de empleo rural</h3>
<p>Este repunte agroexportador se ha traducido en la creación de más de 1,200 empleos formales en comunidades rurales del municipio durante el último año. Asociaciones de productores locales señalan que las inversiones en tecnología de riego por goteo y eficiencia hídrica han sido clave para mantener el rendimiento del suelo frente a las variaciones climáticas de la región.</p>`,
    status: 'published',
    category: 'economia',
    image_url: '/images/sma_agriculture.jpg',
    author_name: 'Equipo Editorial',
    created_at: '2026-08-17T15:00:00Z'
  },
  {
    title: 'Anuncian la programación oficial del Festival de Música de Cámara 2026',
    slug: 'programa-festival-musica-camara-2026',
    excerpt: 'El histórico Teatro Ángela Peralta recibirá a renombrados cuartetos y solistas internacionales en una edición dedicada a la música barroca y contemporánea.',
    content: `<p>El Patronato de la Cultura de San Miguel de Allende presentó este lunes el programa oficial de la 48.ª edición del Festival Internacional de Música de Cámara, que se llevará a cabo a partir de finales de este mes. El icónico Teatro Ángela Peralta será el escenario principal de doce conciertos estelares.</p>
<p>La edición de este año contará con la participación especial del Cuarteto de Cuerdas de Viena, así como destacados ensambles de México y América Latina. El programa incluye además clases magistrales gratuitas para estudiantes de música de todo el país en las instalaciones del Centro Cultural El Nigromante.</p>
<h3>Rescate del patrimonio musical</h3>
<p>Entre los eventos más esperados destaca el concierto de apertura, donde se interpretarán composiciones virreinales rescatadas de archivos históricos de la región del Bajío. Los boletos para todas las funciones estarán disponibles a partir de esta semana en las taquillas del teatro y a través de plataformas digitales.</p>`,
    status: 'published',
    category: 'cultura',
    image_url: '/images/sma_concert.jpg',
    author_name: 'Ana Sofía Vargas',
    created_at: '2026-08-17T14:30:00Z'
  },
  {
    title: 'San Miguel de Allende obtiene la certificación internacional como Destino Sostenible 2026',
    slug: 'san-miguel-distintivo-destino-sostenible-2026',
    excerpt: 'El reconocimiento internacional premia las iniciativas de peatonalización en el Centro Histórico y las políticas públicas de conservación ambiental.',
    content: `<p>En el marco del Foro Global de Turismo Responsable celebrado este 17 de agosto de 2026, la ciudad de San Miguel de Allende fue galardonada con el distintivo de "Destino Sostenible 2026". El galardón reconoce los esfuerzos del municipio por equilibrar el auge turístico con la preservación del patrimonio urbano y natural.</p>
<p>La comisión evaluadora resaltó la ampliación de zonas peatonales en el primer cuadro de la ciudad, el programa de recolección diferenciada de residuos en hoteles boutique y la protección de áreas naturales en la cuenca de la Presa de las Colonias.</p>
<h3>Un modelo para el turismo de alto nivel</h3>
<p>Asociaciones de la industria turística local destacaron que esta certificación refuerza la posición de San Miguel como uno de los destinos culturales más cotizados del continente, atrayendo a visitantes concientes de la sostenibilidad ambiental y el respeto por las comunidades locales.</p>`,
    status: 'published',
    category: 'turismo',
    image_url: '/images/sma_hotel_boutique.jpg',
    author_name: 'Julia Wren',
    created_at: '2026-08-17T14:00:00Z'
  }
];

async function main() {
  console.log('Fetching tenant...');
  const { data: tenant, error: tErr } = await supabase
    .from('tenants')
    .select('id')
    .eq('domain', 'daily.localhost')
    .single();

  if (tErr || !tenant) {
    console.error('Tenant fetch error:', tErr);
    return;
  }

  // 1. Update the Pasqualli post date to today (2026-08-17)
  console.log('Updating Pasqualli article date to today...');
  const { data: updatedPasqualli, error: uErr } = await supabase
    .from('posts')
    .update({ created_at: '2026-08-17T12:00:00Z' })
    .ilike('title', '%Pasqualli%')
    .select();

  if (uErr) {
    console.error('Error updating Pasqualli date:', uErr);
  } else {
    console.log('Pasqualli article updated to 2026-08-17:', updatedPasqualli?.length ? updatedPasqualli[0].title : 'No match found');
  }

  // 2. Insert new articles for August 17, 2026
  console.log('Inserting 5 new articles for August 17, 2026...');
  for (const article of todayNews) {
    const postWithTenant = {
      ...article,
      tenant_id: tenant.id
    };

    const { data: inserted, error: iErr } = await supabase
      .from('posts')
      .insert([postWithTenant])
      .select();

    if (iErr) {
      console.error(`Error inserting ${article.slug}:`, iErr);
    } else {
      console.log(`Successfully inserted [${article.category}]:`, inserted[0].title);
    }
  }

  console.log('All operations complete!');
}

main();
