const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const newArticle = {
  title: 'Qué cambia con el nuevo reglamento de rentas en el Centro Histórico',
  slug: 'nuevo-reglamento-rentas-centro-historico',
  excerpt: 'El Cabildo aprobó nuevas restricciones para plataformas tipo Airbnb. Propietarios deberán tramitar un permiso especial y cumplir con normas estrictas de ruido y basura.',
  content: `<p>En una sesión que se prolongó hasta la madrugada, el Cabildo de San Miguel de Allende aprobó por mayoría de votos el nuevo "Reglamento para la Regulación de Hospedaje a través de Plataformas Digitales", marcando un hito en la forma en que operan servicios como Airbnb, Vrbo y Booking en el corazón de la ciudad.</p>

<p>La medida busca frenar el desplazamiento de los residentes locales y mitigar los problemas vecinales generados por el turismo de fin de semana, que frecuentemente satura los servicios de recolección de basura y altera la tranquilidad con fiestas nocturnas.</p>

<h3>Los tres puntos clave del reglamento</h3>

<p>A partir de su publicación en el Periódico Oficial, los propietarios tendrán un periodo de gracia de 90 días para regularizarse. Estos son los cambios más importantes:</p>

<ol>
  <li><strong>Permiso de Operación Específico:</strong> Ya no bastará con registrar la propiedad en la aplicación. Todo anfitrión deberá tramitar una licencia municipal que requiere el pago de derechos anuales y la inspección de Protección Civil para garantizar que el inmueble cuenta con extintores, detectores de humo y salidas de emergencia.</li>
  <li><strong>Límites de Ocupación:</strong> Queda estrictamente prohibido rentar espacios para más de dos personas por habitación. Las famosas "casas para 15 personas" que operan con solo tres cuartos serán clausuradas y multadas.</li>
  <li><strong>Responsabilidad Solidaria:</strong> El propietario será económicamente responsable por las multas que generen sus huéspedes por exceso de ruido o disposición incorrecta de basura. A la tercera infracción en un mismo año, la licencia será revocada permanentemente.</li>
</ol>

<p>La asociación de anfitriones de plataformas digitales ha expresado su preocupación, argumentando que los trámites excesivos fomentarán la informalidad. Sin embargo, los colectivos vecinales del centro histórico han calificado la medida como "un primer paso vital para recuperar nuestros barrios".</p>`,
  status: 'published',
  category: 'politica',
  image_url: '/images/sma_rentas_cortas.jpg',
  author_name: 'Equipo Editorial',
  author_avatar: null
};

async function run() {
  console.log('Inserting news article 2...');
  
  const { data: tenant } = await supabase
    .from('tenants')
    .select('id')
    .eq('domain', 'daily.localhost')
    .single();

  if (!tenant) {
    console.error('Tenant not found');
    return;
  }

  // Se inserta con la fecha actual pero unos segundos después que la noticia 1
  // para que el orden se mantenga (Mejor Ciudad = Hero)
  // Haremos esta noticia de hace 1 hora para que quede en el Grid
  const createdAt = new Date(Date.now() - 3600000).toISOString();

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
