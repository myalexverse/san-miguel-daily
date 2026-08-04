const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const newArticle = {
  title: 'Quién financia las campañas municipales de 2027',
  slug: 'financiacion-campanas-2027',
  excerpt: 'A tres años de la contienda, la maquinaria electoral en San Miguel de Allende ya calienta motores. Detrás de los partidos tradicionales y el avance de Morena, se perfila la fuerte influencia económica de los desarrolladores inmobiliarios.',
  content: `<p>Aunque el calendario electoral marque el 2027 como una fecha aún distante, en los pasillos de la Presidencia Municipal y en los exclusivos restaurantes del centro histórico de San Miguel de Allende, la carrera por la alcaldía ya comenzó. Tras las reñidas elecciones de 2024, que confirmaron la reelección del priista Mauricio Trejo Pureco por un estrecho margen sobre el candidato de Morena, el panorama político local ha quedado fracturado y altamente competitivo.</p>

<p>Pero en una ciudad donde el metro cuadrado compite en precio con las zonas más exclusivas de la Ciudad de México, la verdadera pregunta no es quiénes serán los candidatos, sino de dónde provendrán los millones de pesos necesarios para impulsar sus campañas.</p>

<h3>El peso del sector inmobiliario</h3>
<p>De acuerdo con registros financieros de contiendas pasadas y entrevistas con operadores políticos locales bajo condición de anonimato, los desarrolladores inmobiliarios y los consorcios hoteleros se han consolidado como los principales patrocinadores "en la sombra". En San Miguel, donde el uso de suelo y los permisos de construcción pueden significar la diferencia entre un proyecto multimillonario y el fracaso, invertir en campañas políticas es visto por muchos empresarios como una póliza de seguro.</p>

<p>"Nadie dona un millón de pesos por simple simpatía ideológica", señala un exfuncionario de la administración municipal anterior. "Lo que se busca es tener una línea directa con Obras Públicas y Desarrollo Urbano. Ese es el verdadero botín".</p>

<h3>Morena, el PRI y la reestructuración del PAN</h3>
<p>El escenario actual muestra a un <strong>PRI</strong> fortalecido en el poder local bajo la figura de Trejo, pero enfrentando el desgaste natural de gobernar. Su estructura de financiamiento recae fuertemente en empresarios locales de la vieja guardia y el sector servicios.</p>

<p>Por su parte, <strong>Morena</strong>, que quedó a menos de dos mil votos de arrebatar la presidencia en 2024, ha comenzado a atraer el interés de inversionistas foráneos y desarrolladores que antes apostaban exclusivamente por el bipartidismo tradicional (PAN-PRI). La "marca" del partido en el poder federal sigue siendo un imán poderoso para el financiamiento.</p>

<p>El <strong>PAN</strong>, relegado a un sorpresivo tercer lugar histórico en las últimas elecciones, enfrenta el reto más grande: convencer a sus antiguos patrocinadores del sector empresarial y vitivinícola de que su proyecto sigue siendo una inversión viable, todo mientras atraviesan una profunda reestructuración interna.</p>

<h3>El factor extranjero</h3>
<p>Un elemento único de San Miguel de Allende es la comunidad de expatriados. Aunque la ley mexicana prohíbe estrictamente el financiamiento político por parte de extranjeros, es un secreto a voces que figuras clave de esta comunidad ejercen su influencia a través de fundaciones, organizaciones civiles y prestanombres, condicionando apoyos filantrópicos a la agenda de los candidatos, especialmente en temas de seguridad y preservación del patrimonio.</p>

<p>A medida que nos acercamos al 2027, el costo de gobernar la "Mejor Ciudad del Mundo" sigue inflando su precio. Queda por ver si el próximo alcalde responderá a los votos de las comunidades rurales o a los cheques firmados en los despachos inmobiliarios.</p>`,
  status: 'published',
  category: 'politica',
  image_url: '/images/sma_presidencia.jpg',
  author_name: 'Equipo Editorial',
  author_avatar: null
};

async function run() {
  console.log('Inserting news article 4...');
  
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
  const createdAt = new Date(Date.now() - 10800000).toISOString();

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
