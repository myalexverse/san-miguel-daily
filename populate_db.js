const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Inserting tenant...');
  const { data: tenantData, error: tErr } = await supabase
    .from('tenants')
    .upsert({ name: 'San Miguel Daily', domain: 'daily.localhost' }, { onConflict: 'domain' })
    .select('id')
    .single();

  if (tErr) {
    console.error('Error inserting tenant:', tErr);
    return;
  }
  
  const tenant_id = tenantData.id;
  console.log('Tenant ID:', tenant_id);

  const posts = [
    {
      tenant_id, title: 'El tren ligero a Querétaro pondría a San Miguel a 40 minutos del Bajío industrial', slug: 'tren-ligero-queretaro', excerpt: 'La concesión firmada el viernes contempla siete estaciones y una inversión de 18 mil millones de pesos.', content: '<p>En un movimiento histórico para la conectividad de la región Laja-Bajío, el gobierno del estado en conjunto con la federación firmaron el pasado viernes la concesión para el tren ligero interurbano que conectará San Miguel de Allende con la ciudad de Querétaro.</p><p>El proyecto, que contempla una inversión de 18 mil millones de pesos, promete reducir el tiempo de traslado a tan solo 40 minutos, despresurizando la carretera 111 que actualmente sufre de saturación constante, particularmente los fines de semana.</p>', status: 'published', published_at: new Date().toISOString(), category: 'san-miguel', image_url: '/images/sma_parroquia_1785796991707.jpg'
    },
    {
      tenant_id, title: 'Presa Allende al 5% de capacidad crítica: el fantasma de la sequía no cede', slug: 'presa-allende-sequia-2024', excerpt: 'La sobreexplotación agroindustrial y la escasez de lluvias dejan a San Miguel y las comunidades rurales al borde del colapso hídrico.', content: '<p>A pesar de las promesas de soluciones a corto plazo, la Presa Allende ha registrado sus niveles más bajos de los últimos 20 años. Las organizaciones locales como Caminos de Agua alertan sobre un abatimiento del acuífero a un ritmo de 2 a 3 metros anuales.</p><p>Mientras el centro histórico mantiene su flujo para el turismo, las comunidades periféricas enfrentan no solo la escasez, sino la contaminación con flúor y arsénico natural derivado de la extracción profunda. Es una bomba de tiempo sanitaria.</p>', status: 'published', published_at: new Date().toISOString(), category: 'san-miguel', image_url: '/images/sma_water_1785797016285.jpg'
    },
    {
      tenant_id, title: 'Un pueblo mágico no puede vivir de la nostalgia', slug: 'pueblo-magico-nostalgia', excerpt: 'Entre bodas de destino y el auge inmobiliario, el corazón local de San Miguel lucha por no convertirse en una escenografía.', content: '<p>San Miguel de Allende dejó de ser un secreto hace décadas. Sin embargo, el modelo actual, sostenido en gran parte por el turismo de bodas de fin de semana, está erosionando el tejido social que hizo del pueblo un refugio de artistas en los años 50.</p><p>La gentrificación ha expulsado a los comerciantes locales, y las galerías han dado paso a franquicias de lujo. Es momento de replantear si queremos un parque temático o una comunidad viva.</p>', status: 'published', published_at: new Date().toISOString(), category: 'opinion', image_url: '/images/ana_sofia_1785796960988.jpg', author_name: 'Ana Sofía Pardo', author_avatar: '/images/ana_sofia_1785796960988.jpg'
    },
    {
      tenant_id, title: 'El presupuesto municipal necesita auditoría, no defensa', slug: 'presupuesto-municipal-auditoria', excerpt: 'A pesar del saldo cero dictaminado por la ASEG, la asignación de recursos a infraestructura prioriza el turismo sobre los servicios básicos.', content: '<p>Las trompetas sonaron anunciando un "saldo cero" por parte de la Auditoría Superior del Estado. Políticamente, es una medalla para la administración actual. Pero los números no mienten, y las prioridades tampoco.</p><p>Cuando desglosamos los más de 1,400 millones de pesos del ejercicio fiscal, resulta evidente que la pavimentación en la zona dorada recibe diez veces más fondos que la red de agua potable en las colonias marginadas. Transparencia no es sinónimo de equidad.</p>', status: 'published', published_at: new Date().toISOString(), category: 'politica', image_url: '/images/roberto_lira_1785796970652.jpg', author_name: 'Roberto Lira', author_avatar: '/images/roberto_lira_1785796970652.jpg'
    },
    {
      tenant_id, title: 'Lo que los extranjeros no entendemos del agua', slug: 'extranjeros-agua-san-miguel', excerpt: 'La comunidad expat debe dejar de ser observadora pasiva ante la crisis ambiental de San Miguel.', content: '<p>Llegamos por el clima, la arquitectura y la hospitalidad. Pero al comprar casas con albercas y jardines exuberantes en medio de una zona semiárida, los extranjeros somos parte del problema hídrico.</p><p>Es nuestra responsabilidad involucrarnos. Apoyar iniciativas locales de captación de agua de lluvia y reducir nuestro consumo no es caridad, es el pago mínimo de renta por vivir en este paraíso prestado.</p>', status: 'published', published_at: new Date().toISOString(), category: 'opinion', image_url: '/images/julia_wren_1785796981014.jpg', author_name: 'Julia Wren', author_avatar: '/images/julia_wren_1785796981014.jpg'
    }
  ];

  console.log('Inserting posts...');
  const { data: pData, error: pErr } = await supabase.from('posts').insert(posts).select();
  
  if (pErr) {
    console.error('Error inserting posts:', pErr);
  } else {
    console.log('Inserted posts successfully:', pData.length);
  }
}

run();
