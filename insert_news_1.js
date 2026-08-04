const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const newArticle = {
  title: 'San Miguel de Allende refrenda su corona: Mejor Ciudad del Mundo por tercer año consecutivo',
  slug: 'mejor-ciudad-del-mundo-2026',
  excerpt: 'La prestigiosa revista Travel + Leisure vuelve a colocar a la ciudad en la cima del turismo mundial, un hito histórico que plantea nuevos retos para la infraestructura local.',
  content: `<p>Por tercer año consecutivo, San Miguel de Allende ha sido galardonada como la "Mejor Ciudad del Mundo" en los premios anuales de la revista <em>Travel + Leisure</em>. Este reconocimiento sin precedentes (2024, 2025 y ahora 2026) consolida a la joya guanajuatense en el "salón de la fama" del turismo global.</p>

<p>Los lectores de la revista destacaron la impecable conservación de la arquitectura colonial, la calidez de los habitantes y la oferta gastronómica y hotelera de lujo como los factores determinantes para otorgar la máxima calificación a la ciudad, superando a destinos como Florencia, Kioto y Oaxaca.</p>

<h3>Un premio que exige responsabilidad</h3>

<p>Aunque el sector hotelero y restaurantero celebra el galardón, el anuncio ha reavivado el debate local sobre la capacidad de carga de la ciudad. "Es un honor inmenso, pero también una alerta roja", comentó un representante de la asociación civil <em>Rescatemos San Miguel</em>. "Cada año recibimos más turismo, pero nuestras calles, nuestro suministro de agua y los servicios de recolección de basura están al límite de su capacidad operativa".</p>

<p>El reto para el gobierno municipal en turno será equilibrar esta gigantesca derrama económica con el bienestar de la ciudadanía. La administración actual ha prometido destinar un porcentaje mayor de los impuestos recaudados por hospedaje hacia obras de mejoramiento en las colonias periféricas, buscando que el éxito turístico finalmente permee más allá del centro histórico.</p>`,
  status: 'published',
  category: 'san-miguel',
  image_url: '/images/sma_travel_leisure.jpg',
  author_name: 'Equipo Editorial',
  author_avatar: null
};

async function run() {
  console.log('Inserting news article...');
  
  // Get tenant ID
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id')
    .eq('domain', 'daily.localhost')
    .single();

  if (!tenant) {
    console.error('Tenant not found');
    return;
  }

  const articleWithTenant = {
    ...newArticle,
    tenant_id: tenant.id,
    created_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('posts')
    .insert([articleWithTenant])
    .select();
    
  if (error) {
    console.error('Error inserting article:', error);
  } else {
    console.log('Inserted successfully:', data[0].slug);
  }
}

run();
