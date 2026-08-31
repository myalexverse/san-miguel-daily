const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function publishEssay() {
  console.log("=== PUBLICANDO ENSAYO FILOSÓFICO 'NO BLASFEMAR' ===");

  // 1. Obtener Tenant
  const { data: tenant, error: tErr } = await supabase
    .from('tenants')
    .select('id')
    .eq('domain', 'daily.localhost')
    .single();

  if (tErr || !tenant) {
    console.error("Error al obtener el tenant:", tErr);
    process.exit(1);
  }

  const slug = "no-blasfemar-culpa-originaria-fisco-deuda-cuna-a-la-tumba";
  const title = "No blasfemar: La culpa originaria, el fisco y la deuda de la cuna a la tumba";
  const excerpt = "Una reflexión filosófica sobre cómo el Estado, la religión y el orden contemporáneo convierten la existencia en una infracción predeterminada y en una deuda perpetua que solo se extingue ante el desenlace natural.";

  const content = `
    <p class="lead">Desde el primer hálito de vida hasta la expiración final, el ser humano transita por un entramado institucional diseñado para recordarle una condición ineludible: <strong>se nace en deuda</strong>. Lejos de constituir un territorio de soberanía absoluta, la existencia individual ha sido codificada por el Estado, la fe dogmática y los aparatos de normalización social como un expediente abierto en el que todo sujeto es, por definición, un infractor en potencia y un deudor perpetuo.</p>

    <h2>1. El Estado y la deuda civil: La sospecha fiscal</h2>
    <p>Para el Estado moderno y su andamiaje burocrático, ningún ciudadano nace inocente ni libre de obligaciones preexistentes. Al momento de nacer, la estructura legal otorga una identidad a través de un acta de nacimiento, pero ese mismo documento sella la adhesión forzosa a un <em>contrato social no firmado</em>.</p>
    
    <p>A partir de ese instante fundacional, el acto mismo de existir queda gravado:</p>
    <ul>
      <li><strong>La presunción de evasión:</strong> La administración tributaria opera bajo una premisa implícita de desconfianza. El contribuyente es observado como un evasor potencial cuya conducta debe ser auditada, regulada y encauzada.</li>
      <li><strong>El costo de habitar el mundo:</strong> Trabajar, consumir alimentos, poseer un techo o desplazarse genera una cadena ininterrumpida de obligaciones impositivas. La norma jurídica no solo organiza la convivencia, sino que presupone la infracción: la multa y la sanción se yerguen como mecanismos simultáneos de disciplina conductual y recaudación fiscal.</li>
    </ul>

    <div class="bg-paper-2 border-l-4 border-spot p-5 my-6 rounded-r">
      <p class="font-serif italic text-ink m-0">«El Estado te otorga un nombre para poder inscribirte en su libro de cuentas; a partir de ese momento, respirar y producir se convierten en un tributo ininterrumpido.»</p>
    </div>

    <h2>2. La religión y la culpa originaria: El pecado heredado</h2>
    <p>En el plano metafísico y espiritual, las tradiciones dogmáticas replican con exactitud milimétrica la lógica de la deuda civil. La doctrina del <strong>pecado original</strong> estipula que el ser humano no arriba al mundo limpio, sino marcado de origen por una transgresión ajena.</p>

    <p>El nacimiento no se celebra como una página en blanco, sino como la inauguración de un pasivo moral. El bautismo y los sucesivos sacramentos de purificación operan como un trámite de redención indispensable para saldar una culpa no cometida. La biografía entera se transforma en un peregrinaje penitencial para gestionar el perdón de una deuda contraída antes de la primera palabra.</p>

    <h2>3. La filosofía del control: De la cuna a la tumba</h2>
    <p>El pensamiento crítico contemporáneo ha desvelado las capas más profundas de este dispositivo de sujeción:</p>

    <h3>El <em>«Homo Criminalis»</em> en Michel Foucault</h3>
    <p>En su célebre obra <em>Vigilar y castigar</em>, Michel Foucault demostró que las instituciones pilares de la modernidad —escuelas, cuarteles, hospitales, juzgados y prisiones— no tienen por objetivo primordial emancipar al individuo, sino <strong>normalizarlo</strong>. El sistema clasifica de forma implacable: cualquier desviación de la cuadrícula prescrita reclasifica al ciudadano de «sujeto funcional» a «desviado», «infractor» o «enfermo» que amerita corrección y aislamiento.</p>

    <h3>La sociedad del rendimiento y el sujeto endeudado</h3>
    <p>Teóricos actuales como Byung-Chul Han y Maurizio Lazzarato coinciden en que el capitalismo tardío ha perfeccionado este mecanismo transformándonos en <em>sujetos perpetuamente endeudados</em>. Se nace debiendo el parto en la clínica, se continúa adeudando la formación universitaria y se hipoteca el futuro para asegurar una vivienda. La culpa y la deuda no son fallas del sistema: son las herramientas más depuradas y eficaces para garantizar una población dócil, autoexplotada y predecible.</p>

    <hr class="my-8 border-hairline" />

    <h2>4. La ironía del desenlace natural</h2>
    <p>Frente a este cerco omnipresente, emerge una paradoja reveladora: <strong>la muerte pacífica es el único umbral donde el Estado y la religión finalmente suspenden la búsqueda del delito</strong>.</p>

    <p>Solo al momento en que se extiende el acta de defunción y se consuman los ritos fúnebres de despedida, el individuo deja de ser un contribuyente fiscalizable, un presunto infractor o un alma en deuda. La maquinaria burocrática se detiene no por misericordia, sino porque el expediente ha quedado sin saldo cobrable.</p>

    <p>Comprender esta arquitectura no implica sucumbir al cinismo, sino interrogar las raíces del Contrato Social (de Hobbes a Rousseau) y preguntarnos por qué aceptamos ceder porciones cardinales de nuestra libertad a cambio de una promesa de orden que nos cobra, sin tregua, el simple hecho de existir.</p>

    <p class="text-sm text-ink3 italic mt-8 border-t border-hairline pt-4">Ensayo filosófico por <strong>Lucas Lucatero de Diego</strong>, colaboración especial de reflexión y pensamiento crítico para <em>San Miguel DAILY</em>.</p>
  `;

  // Comprobar si ya existe para actualizar o insertar
  const { data: existingPost } = await supabase
    .from('posts')
    .select('id')
    .eq('tenant_id', tenant.id)
    .eq('slug', slug)
    .maybeSingle();

  const payload = {
    tenant_id: tenant.id,
    title: title,
    slug: slug,
    excerpt: excerpt,
    content: content,
    status: 'published',
    category: 'opinion',
    image_url: '/images/filosofia_deuda_culpa_existencia.jpg',
    author_name: 'Lucas Lucatero de Diego',
    created_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  };

  let result;
  if (existingPost) {
    console.log(`Actualizando ensayo existente con ID: ${existingPost.id}...`);
    result = await supabase
      .from('posts')
      .update(payload)
      .eq('id', existingPost.id)
      .select();
  } else {
    console.log("Insertando nuevo ensayo...");
    result = await supabase
      .from('posts')
      .insert([payload])
      .select();
  }

  if (result.error) {
    console.error("Error al guardar el ensayo:", result.error.message);
    process.exit(1);
  }

  console.log("✅ ENSAYO PUBLICADO CON ÉXITO EN SUPABASE!");
  console.log("ID:", result.data[0].id);
  console.log("Slug:", result.data[0].slug);
  console.log("URL:", `https://sanmigueldaily.com/p/${result.data[0].slug}`);
}

publishEssay();
