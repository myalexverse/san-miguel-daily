const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const newArticle = {
  title: 'Guía: doce restaurantes nuevos en la ciudad este verano',
  slug: 'restaurantes-verano-2026',
  excerpt: 'Desde cocinas de proximidad y rescate prehispánico hasta pizzerías de masa madre con fermentación lenta. La oferta gastronómica de San Miguel de Allende se reinventa esta temporada con propuestas que apuestan por la sostenibilidad y el diseño.',
  content: `<p>San Miguel de Allende continúa consolidándose como uno de los epicentros gastronómicos más vibrantes de Norteamérica. Si el verano pasado vimos el boom de las terrazas panorámicas y la coctelería de autor, la temporada 2026 está marcada por un regreso a los orígenes: ingredientes de kilómetro cero, hornos de leña y menús que honran la biodiversidad del Bajío.</p>

<p>Tras un recorrido exhaustivo por las calles empedradas de la ciudad, nuestro equipo editorial ha seleccionado doce aperturas y renovaciones que están redefiniendo el paladar local. Aquí destacamos cuatro paradas obligatorias para este verano.</p>

<h3>1. Martez: El ahumado como lenguaje</h3>
<p>Ubicado en el renovado Hotel Piedras Negras, <strong>Martez</strong> marca el regreso del reconocido chef Rodrigo Carrasco a la escena del Bajío. Su propuesta se define como una "cocina de proximidad" donde el fuego y el humo son los hilos conductores. No puedes dejar de probar su aguachile floral, que cambia diariamente según la pesca, y la burrata de producción artesanal local, ahumada en frío con maderas de mezquite.</p>

<h3>2. Pirules Garden Kitchen: Sostenibilidad al plato</h3>
<p>Escondido en los extensos y frondosos jardines del Rosewood, <strong>Pirules</strong> es el nuevo proyecto del chef Odín Rocha. Más que un restaurante, es una extensión del huerto del hotel. El menú es radicalmente estacional; los vegetales no son guarniciones, sino los protagonistas absolutos de platos que celebran la tierra de Guanajuato, acompañados de una selecta carta de vinos naturales.</p>

<h3>3. Raíces: Un homenaje a las fondas de antaño</h3>
<p>Para quienes buscan confort y autenticidad sin pretensiones, <strong>Raíces</strong> es el secreto mejor guardado de este verano. Alejado del bullicio de la plaza principal, este rincón rescata recetas familiares y técnicas de la abuela. Sus chilaquiles "embarazados", rellenos de un exquisito chicharrón prensado, y la torta ahogada de cochinita pibil, se han convertido en un fenómeno viral entre los locales y los *foodies* más exigentes.</p>

<h3>4. Bennu y la ciencia de la masa madre</h3>
<p>En el corazón de un hermoso patio colonial que huele a albahaca fresca y leña, <strong>Bennu</strong> ha elevado el estándar de la pizza en la ciudad. Utilizando técnicas de fermentación lenta de hasta 72 horas y masa madre alimentada cuidadosamente, logran bordes alveolados e ingredientes de pequeños productores locales, demostrando que la comida reconfortante también puede ser alta cocina.</p>

<p>La escena restaurantera de San Miguel nos recuerda que, a pesar de su fama internacional, el verdadero lujo reside en la calidad de los ingredientes y el respeto por el entorno.</p>`,
  status: 'published',
  category: 'turismo',
  image_url: '/images/sma_restaurantes.jpg',
  author_name: 'Equipo Editorial',
  author_avatar: null
};

async function run() {
  console.log('Inserting news article 3...');
  
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id')
    .eq('domain', 'daily.localhost')
    .single();

  if (!tenant) {
    console.error('Tenant not found');
    return;
  }

  // Set the creation date a bit older than the previous news so they order correctly in the grid
  const createdAt = new Date(Date.now() - 7200000).toISOString();

  const articleWithTenant = {
    ...newArticle,
    tenant_id: tenant.id,
    created_at: createdAt
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
