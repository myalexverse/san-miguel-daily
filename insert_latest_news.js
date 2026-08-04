const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const articles = [
  {
    title: 'Inician los preparativos finales para el FASMA 2026 este viernes',
    slug: 'preparativos-fasma-2026',
    excerpt: 'El Festival de las Artes de San Miguel de Allende (FASMA) afina detalles para su inauguración, esperando recibir a más de 20,000 asistentes en sus múltiples sedes.',
    content: `<p>A escasos días de su inauguración oficial, las calles de San Miguel de Allende ya respiran el ambiente del <strong>Festival de las Artes (FASMA) 2026</strong>. Este viernes inician los montajes de los escenarios principales y la adecuación de galerías, teatros y plazas públicas que albergarán más de 100 actividades culturales.</p>
    <p>El comité organizador confirmó que el evento de apertura se llevará a cabo en el Instituto Allende, seguido de un magno concierto gratuito en el Jardín Principal a cargo de la Banda de Música del Estado de Guanajuato. Se espera una derrama económica superior a los 50 millones de pesos durante los 15 días del festival.</p>`,
    status: 'published',
    category: 'cultura',
    image_url: '/images/sma_fasma.jpg',
    author_name: 'Equipo Editorial',
  },
  {
    title: 'Benny Ibarra visita San Miguel de Allende y anuncia gira',
    slug: 'benny-ibarra-visita-san-miguel',
    excerpt: 'El cantante y actor mexicano fue visto disfrutando de la gastronomía local y compartió en exclusiva detalles de sus próximos proyectos teatrales.',
    content: `<p>San Miguel de Allende sigue siendo el destino favorito de las celebridades mexicanas. Este fin de semana, el cantautor y actor <strong>Benny Ibarra</strong> fue captado recorriendo el centro histórico y disfrutando de la oferta culinaria de la ciudad.</p>
    <p>En un breve encuentro con medios locales, Ibarra confirmó que aprovechará la inspiración que le brinda la ciudad para afinar los detalles de su próxima gira acústica por teatros de la República Mexicana, la cual incluirá una parada especial en el Teatro Ángela Peralta a finales de año.</p>`,
    status: 'published',
    category: 'cultura',
    image_url: '/images/sma_concert.jpg',
    author_name: 'Equipo Editorial',
  },
  {
    title: 'Confirman hallazgo de ciudadano extranjero en Boca de la Cañada',
    slug: 'hallazgo-ciudadano-extranjero-boca-canada',
    excerpt: 'Autoridades locales concluyeron el operativo de búsqueda tras localizar el cuerpo sin vida del estadounidense reportado como desaparecido.',
    content: `<p>Tras casi 72 horas de búsqueda intensiva, Protección Civil y Bomberos de San Miguel de Allende confirmaron el rescate del cuerpo sin vida del ciudadano estadounidense de 64 años que había sido reportado como desaparecido desde el viernes pasado.</p>
    <p>El hallazgo ocurrió en un cuerpo de agua cercano a la comunidad de <strong>Boca de la Cañada</strong>. Según los reportes preliminares de las autoridades de seguridad, todo apunta a que se trató de un trágico accidente mientras el hombre realizaba senderismo en la zona. La Embajada de los Estados Unidos ya ha sido notificada para proceder con la repatriación.</p>`,
    status: 'published',
    category: 'san-miguel',
    image_url: '/images/sma_rescue.jpg',
    author_name: 'Equipo Editorial',
  },
  {
    title: 'Recuperan dos cuerpos en la presa de Jalpa tras operativo de búsqueda',
    slug: 'recuperan-cuerpos-presa-jalpa',
    excerpt: 'Un fin de semana trágico en los cuerpos de agua del municipio; Protección Civil hace un llamado urgente a evitar nadar en presas.',
    content: `<p>En un operativo conjunto entre buzos de rescate estatal y municipal, se logró la recuperación de los cuerpos de un hombre de 35 años y un adolescente de 17 en la <strong>Presa de Jalpa</strong>, tras haberse sumergido durante el domingo por la tarde.</p>
    <p>A pesar de los constantes avisos de prohibición, las altas temperaturas del fin de semana motivaron a varias familias a visitar los embalses locales. La Secretaría de Seguridad Pública reiteró el llamado urgente a la población para no ingresar a presas, ríos o bordos, ya que las corrientes subterráneas y el fango los hacen extremadamente peligrosos.</p>`,
    status: 'published',
    category: 'san-miguel',
    image_url: '/images/sma_presa.jpg',
    author_name: 'Equipo Editorial',
  },
  {
    title: 'Éxito total en torneo nacional de taekwondo; asisten mil competidores',
    slug: 'exito-torneo-nacional-taekwondo',
    excerpt: 'San Miguel de Allende se consolida como sede deportiva al recibir a delegaciones de 20 estados de la República.',
    content: `<p>Con una participación récord de más de mil atletas, el <strong>Torneo Nacional Abierto de Taekwondo</strong> celebrado este fin de semana en San Miguel de Allende fue calificado como un éxito rotundo por la Comisión Municipal del Deporte.</p>
    <p>El evento reunió a competidores desde cintas blancas infantiles hasta seleccionados nacionales en las categorías de combate libre (Kyorugi) y formas (Poomsae). Además de fomentar el deporte, el torneo generó una importante ocupación hotelera, demostrando que la ciudad tiene la infraestructura necesaria para diversificar su oferta turística hacia el turismo deportivo.</p>`,
    status: 'published',
    category: 'san-miguel',
    image_url: '/images/sma_taekwondo.jpg',
    author_name: 'Equipo Editorial',
  }
];

async function run() {
  console.log('Inserting latest news articles...');
  
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id')
    .eq('domain', 'daily.localhost')
    .single();

  if (!tenant) {
    console.error('Tenant not found');
    return;
  }

  // Create articles with timestamps cascading backwards slightly so they don't overwrite the main news 
  // but still appear recent if needed.
  let timeOffset = 3600000; 

  const articlesToInsert = articles.map((art, index) => {
    return {
      ...art,
      tenant_id: tenant.id,
      created_at: new Date(Date.now() - (timeOffset * (index + 20))).toISOString()
    }
  });

  const { data, error } = await supabase
    .from('posts')
    .insert(articlesToInsert)
    .select();
    
  if (error) {
    console.error('Error inserting articles:', error);
  } else {
    console.log('Inserted successfully:', data.length, 'articles');
  }
}

run();
