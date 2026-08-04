const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const newContent = `<p>Llegamos por el clima perfecto, la arquitectura colonial y la calidez inigualable de su gente. San Miguel de Allende se ha convertido en el paraíso prometido para miles de expatriados. Sin embargo, al comprar casas con grandes jardines, albercas y sistemas de aspersión en medio de una zona semiárida, los extranjeros somos, a menudo sin saberlo, parte activa de una crisis hídrica sin precedentes.</p>

<p>Los datos son alarmantes y no pueden ignorarse. Según <strong>Caminos de Agua</strong>, una organización local, el Acuífero del Alto Río Laja —nuestra única fuente de agua— está siendo sobreexplotado a un ritmo insostenible. El nivel del agua subterránea cae entre 2 y 3 metros cada año. Esta extracción desmedida nos ha obligado a perforar pozos cada vez más profundos, alcanzando fósiles de agua que han estado atrapados bajo tierra por milenios.</p>

<p>Pero la escasez es solo la mitad de la historia. A esas profundidades, el agua extraída está altamente contaminada con niveles peligrosos de <strong>arsénico y flúor</strong> naturales. Ningún filtro comercial estándar, ni siquiera hervir el agua, puede eliminar estos metales pesados. Las consecuencias de consumir esta agua a largo plazo incluyen fluorosis esquelética, daño renal y diversos tipos de cáncer, condiciones que ya están devastando a las comunidades rurales aledañas a San Miguel.</p>

<h3>Nuestra Responsabilidad como Residentes</h3>

<p>"Muchos expatriados simplemente asumen que si compran agua en garrafón, el problema no es de ellos", me comentó recientemente un voluntario. "Pero la crisis es regional y estructural. Cada gota que extraemos para mantener un jardín verde inglés en el bajío mexicano, es una gota menos para las comunidades indígenas y rurales que no pueden costear filtros de carbón activado o sistemas de ósmosis inversa".</p>

<p>La comunidad internacional en San Miguel tiene una responsabilidad moral. No podemos seguir siendo residentes de tiempo completo y ciudadanos de medio tiempo. Es imperativo que financiemos iniciativas de mitigación, como los programas comunitarios de captación de agua de lluvia y la distribución de filtros cerámicos a bajo costo.</p>

<p>Reducir nuestro consumo mediante flora nativa, instalar sistemas de recolección en nuestros techos y presionar por regulaciones más estrictas para la industria local no es un acto de caridad: es el precio mínimo que debemos pagar por el privilegio de vivir en este paraíso prestado.</p>`;

async function run() {
  console.log('Updating essay...');
  const { data, error } = await supabase
    .from('posts')
    .update({ content: newContent })
    .eq('slug', 'extranjeros-agua-san-miguel')
    .select();
    
  if (error) {
    console.error('Error updating essay:', error);
  } else {
    console.log('Updated successfully:', data.length);
  }
}

run();
