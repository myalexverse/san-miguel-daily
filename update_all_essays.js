const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const articles = [
  {
    slug: 'tren-ligero-queretaro',
    content: `<p>El proyecto del tren de pasajeros que conectará Querétaro con San Luis Potosí avanza, y San Miguel de Allende se prepara para albergar una de sus estaciones más estratégicas. Según los últimos reportes de licitación federal, este tramo de 68 kilómetros promete reducir el tiempo de traslado al Bajío industrial a menos de 40 minutos.</p>

<p>Para la economía local, el tren representa una navaja de doble filo. Por un lado, despresurizará la Carretera Federal 111, tristemente célebre por su saturación extrema durante los fines de semana y puentes vacacionales. La conexión directa con la estación en Querétaro abriría una puerta rápida al Aeropuerto Internacional (AIQ) y a los corredores industriales, facilitando el turismo de negocios y el flujo de visitantes nacionales.</p>

<p>Sin embargo, urbanistas advierten que una conectividad tan agresiva podría acelerar la urbanización descontrolada en las periferias del municipio. "Una estación de tren no solo trae pasajeros, trae desarrollo inmobiliario comercial a su alrededor", señala un arquitecto local. El reto para el Instituto Municipal de Planeación (IMPLAN) será contener el crecimiento para que San Miguel no se convierta en un suburbio de paso, sino que conserve su escala humana y patrimonial.</p>`
  },
  {
    slug: 'presa-allende-sequia-2024',
    content: `<p>El paisaje que ofrece hoy la Presa Allende es desolador. Con niveles que rozan el 5% de su capacidad total, el embalse se ha convertido en una planicie de tierra agrietada, salpicada por los restos de lo que alguna vez fue un ecosistema vibrante. La sequía prolongada que azota al estado de Guanajuato es solo el detonante visible de un problema mucho más profundo.</p>

<p>El verdadero colapso ocurre bajo tierra. El acuífero del Alto Río Laja sigue descendiendo a un ritmo alarmante de hasta 3 metros por año. Organizaciones como Caminos de Agua han documentado que más del 85% de la extracción hídrica en la región se destina a la agroindustria de exportación. Estamos exportando nuestra agua en forma de brócoli y espárragos hacia Estados Unidos, mientras las comunidades rurales enfrentan pozos secos.</p>

<p>A esta escasez se suma la crisis del lirio acuático que plagó la presa en años recientes, alimentado por las descargas de aguas residuales sin tratar. La combinación de sequía extrema, extracción desregulada y contaminación plantea una amenaza existencial para el municipio. Si no se declara una veda estricta a las concesiones industriales y agrícolas, el "fantasma de la sequía" dejará de ser una metáfora para convertirse en nuestra realidad permanente.</p>`
  },
  {
    slug: 'pueblo-magico-nostalgia',
    content: `<p>San Miguel de Allende dejó de ser el secreto mejor guardado de México hace décadas. Hoy, las calles empedradas que alguna vez inspiraron a pintores y escritores en los años cincuenta, son el telón de fondo de una poderosa maquinaria económica: el turismo de romance.</p>

<p>Los datos son innegables. Con más de 900 bodas anuales, esta industria genera una derrama económica superior a los 2 mil millones de pesos. Sin embargo, este modelo de "gentrificación transnacional" está erosionando silenciosamente el tejido social de la ciudad. El centro histórico se ha convertido en una escenografía de lujo, donde los precios inmobiliarios han expulsado a los sanmiguelenses hacia la periferia.</p>

<p>Hemos transformado nuestro patrimonio cultural en un recurso estandarizado para el consumo global. Las mercerías, panaderías y talleres de oficios han sido reemplazados por galerías de arte, hoteles boutique y franquicias. Un pueblo no puede vivir únicamente de la nostalgia de lo que fue, ni puede sostenerse como un simple parque temático para expatriados y turistas de fin de semana. Es urgente replantear las políticas de vivienda y comercio local antes de que el corazón de San Miguel deje de latir por completo.</p>`
  },
  {
    slug: 'presupuesto-municipal-auditoria',
    content: `<p>Las trompetas sonaron con fuerza cuando la administración actual anunció un "saldo cero" por parte de la Auditoría Superior del Estado de Guanajuato (ASEG) para el ejercicio fiscal 2024. Políticamente, es una medalla de oro; significa que no se detectaron irregularidades financieras en los más de 1,400 millones de pesos ejercidos. Pero la transparencia contable no es sinónimo de equidad social.</p>

<p>Cuando desglosamos el Presupuesto de Egresos, las prioridades de la administración quedan al descubierto. Resulta evidente que la inversión en infraestructura se concentra desproporcionadamente en la "zona dorada" y los accesos turísticos. La pavimentación y el embellecimiento del centro histórico reciben asignaciones masivas, mientras que la red de agua potable y el alcantarillado en colonias marginadas y comunidades rurales avanzan a cuentagotas.</p>

<p>Necesitamos dejar de usar las auditorías como escudos políticos. Que el dinero esté justificado con facturas no significa que esté bien gastado. El verdadero debate que el Cabildo debe enfrentar este año no es si los números cuadran, sino para quién gobiernan. San Miguel de Allende no puede seguir administrando dos realidades: una ciudad de primer mundo para los visitantes, y un municipio con rezagos históricos para sus habitantes.</p>`
  }
];

async function run() {
  console.log('Updating all 4 remaining essays...');
  for (const article of articles) {
    const { data, error } = await supabase
      .from('posts')
      .update({ content: article.content })
      .eq('slug', article.slug)
      .select();
      
    if (error) {
      console.error('Error updating', article.slug, error);
    } else {
      console.log('Updated', article.slug, 'successfully');
    }
  }
}

run();
