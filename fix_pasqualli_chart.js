const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const updatedContent = `<p>Una reciente encuesta realizada por el equipo de investigación de San Miguel DAILY revela la intención de voto de la militancia y simpatizantes del Partido Acción Nacional (PAN) rumbo a la elección municipal de 2027 en San Miguel de Allende.</p>

<p>De acuerdo con los datos recabados a través de 800 encuestas cara a cara en la cabecera municipal y principales comunidades rurales, <strong>Juan Pasqualli Rodríguez</strong> consolida un liderazgo claro con el <strong>31.4%</strong> de las preferencias efectivas, sacando una ventaja de más de 8 puntos porcentuales sobre su competidor más cercano.</p>

<h3>Resultados de la Encuesta: Intención de Voto PAN</h3>

<ul>
  <li><strong>Juan Pasqualli Rodríguez:</strong> 31.4%</li>
  <li><strong>Oliverio Fernández:</strong> 23.3%</li>
  <li><strong>Romina Hernández:</strong> 13.2%</li>
  <li><strong>Carlos Hernández:</strong> 12.7%</li>
  <li><strong>Ángel Gastelum Cadena:</strong> 11.0%</li>
  <li><strong>Luis López:</strong> 4.4%</li>
  <li><strong>No me importa / Aún no decide:</strong> 4.0%</li>
</ul>

<div class="my-8">
  <img src="/images/sma_pan_encuesta_updated.jpg" alt="Gráfica Encuesta PAN San Miguel de Allende 2027 - Juan Pasqualli" class="w-full h-auto rounded-lg shadow-md border border-hairline" />
</div>

<p>El análisis de estos datos muestra que a menos de un año del inicio formal del proceso electoral, Juan Pasqualli Rodríguez se posiciona como la opción preferida para encabezar la coalición conservadora en el municipio. Oliverio Fernández ocupa la segunda posición con un 23.3%, seguido por Romina Hernández (13.2%) y Carlos Hernández (12.7%).</p>

<h3>Metodología del Estudio</h3>
<p>El levantamiento estadístico contó con un nivel de confianza del 95% y un margen de error de +/- 3.5%. Se realizaron 800 encuestas cara a cara distribuidas en puntos estratégicos de la zona urbana y zonas rurales del municipio de San Miguel de Allende.</p>`;

async function main() {
  console.log("Fixing Pasqualli article image URL in Supabase...");

  const { data, error } = await supabase
    .from('posts')
    .update({
      content: updatedContent,
      created_at: '2026-08-17T12:00:00Z'
    })
    .ilike('title', '%Pasqualli%')
    .select();

  if (error) {
    console.error("Error updating Pasqualli article:", error);
  } else {
    console.log("Successfully fixed Pasqualli article image tag!");
    console.log("Article ID:", data[0]?.id);
  }
}

main();
