const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const newArticle = {
  title: 'El peso, el nearshoring y las casas de dos millones de dólares',
  slug: 'nearshoring-casas-2-millones',
  excerpt: 'A pesar del "súper peso" que encarece las transacciones en dólares, el mercado inmobiliario de ultra lujo en San Miguel de Allende sigue rompiendo récords, impulsado por el efecto dominó del nearshoring en el Bajío.',
  content: `<p>Durante los últimos meses, los analistas económicos han observado con cautela el impacto del fortalecimiento del peso mexicano frente al dólar. Para un mercado como el de San Miguel de Allende, donde históricamente una porción significativa del inventario inmobiliario se cotiza en moneda estadounidense, la lógica dictaría una desaceleración. Sin embargo, los datos cuentan una historia diametralmente opuesta.</p>

<p>En el último trimestre, la venta de propiedades residenciales por encima del umbral de los dos millones de dólares ha experimentado un repunte inusual, desafiando las predicciones convencionales.</p>

<h3>El "Efecto Derrame" del Nearshoring</h3>
<p>La respuesta a esta paradoja económica no se encuentra en las calles empedradas de la ciudad, sino a escasos 45 minutos de distancia, en los corredores industriales de Querétaro y Celaya. El fenómeno del <em>nearshoring</em> —la relocalización de cadenas de suministro globales hacia México— ha atraído niveles récord de Inversión Extranjera Directa (IED) a la región del Bajío.</p>

<p>Con la llegada de megacorporaciones manufactureras y tecnológicas, ha surgido una nueva ola de altos ejecutivos, directores de planta y consultores internacionales. Para esta élite corporativa, San Miguel de Allende se ha convertido en el "refugio dormitorio" por excelencia. La ciudad ofrece la seguridad, la oferta gastronómica y las amenidades de clase mundial que demandan estos perfiles, compensando con creces la distancia del trayecto diario.</p>

<h3>El cambio de perfil del comprador</h3>
<p>Históricamente, el comprador típico de propiedades de ultra lujo en San Miguel era el jubilado estadounidense o canadiense ("snowbird"). Hoy, el perfil se ha diversificado drásticamente.</p>

<p>"Estamos viendo compradores más jóvenes, de entre 45 y 55 años, muchos de ellos directivos europeos y asiáticos que están estableciendo la sede regional de sus empresas en el Bajío", explica un bróker inmobiliario especializado en el segmento premium. "Para ellos, el precio de la propiedad no es un gasto de retiro, es una inversión patrimonial a largo plazo, y el tipo de cambio fuerte del peso, paradójicamente, les da confianza en la estabilidad macroeconómica del país".</p>

<h3>Nuevas exigencias del mercado</h3>
<p>Estas nuevas casas de dos millones de dólares no son las clásicas haciendas restauradas en el Centro Histórico. La demanda actual se inclina fuertemente hacia desarrollos periféricos o "haciendas modernas" que combinan acabados coloniales con arquitectura de vanguardia, domótica, conectividad de fibra óptica (indispensable para el modelo de trabajo híbrido) y sistemas sostenibles de captación de agua y energía solar.</p>

<p>Mientras la región continúe atrayendo capital industrial, todo indica que la burbuja de bienes raíces en San Miguel de Allende está lejos de estallar, transformando permanentemente su paisaje urbano y económico.</p>`,
  status: 'published',
  category: 'economia',
  image_url: '/images/sma_luxury.jpg',
  author_name: 'Equipo Editorial',
  author_avatar: null
};

async function run() {
  console.log('Inserting news article 5...');
  
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id')
    .eq('domain', 'daily.localhost')
    .single();

  if (!tenant) {
    console.error('Tenant not found');
    return;
  }

  // Set the creation date older than the previous news so they order correctly in the grid
  const createdAt = new Date(Date.now() - 14400000).toISOString();

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
