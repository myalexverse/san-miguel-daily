const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function publishArticle() {
  console.log("=== PUBLICANDO NOTA DE ANÁLISIS DE JAIME AYALA (SALAMANCA) ===");

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

  const slug = "anatomia-del-poder-salamanca-mercado-tomasa-estevez-jaime-ayala";
  const title = "Anatomía del poder en Salamanca: El Mercado Tomasa Estévez y la ingeniería electoral detrás de las campañas";
  const excerpt = "Un análisis a fondo por Jaime Ayala sobre el uso del voto de castigo, las denuncias mediáticas como distractor político y las fuerzas reales que controlan el abasto y la economía en el principal centro comercial de Salamanca.";

  const content = `
    <p class="lead"><strong>Salamanca, Gto.</strong> — Detrás de las consignas de campaña, las promesas de modernización y el cruce de acusaciones en redes sociales, la dinámica política de Salamanca opera bajo una precisa arquitectura de ingeniería electoral. Lejos de ser disputas espontáneas, lo que hoy se observa en el escenario local responde a patrones estratégicos donde el descontento ciudadano, el voto de castigo y los conflictos históricos —como la crisis en el Mercado Tomasa Estévez— son instrumentalizados como activos de negociación y desgaste.</p>

    <h2>1. La ingeniería electoral: El voto de castigo como trampolín político</h2>
    <p>La construcción de candidaturas que buscan posicionarse en el electorado salmantino sin contar con el respaldo de las grandes maquinarias partidistas tradicionales suele recurrir a cinco ejes tácticos bien delimitados:</p>

    <ul>
      <li><strong>El voto de castigo como bandera:</strong> Transformar la boleta electoral en una herramienta de protesta contra las fuerzas mayoritarias (Morena y PAN). Mediante la denuncia constante de irregularidades —como el reparto clientelar de despensas o presuntos desvíos—, el candidato busca colocarse como la única opción fiscalizadora y no comprometida.</li>
      <li><strong>Campaña de contraste («David contra Goliat»):</strong> Asumir la falta de recursos económicos como una virtud moral. Frente a los mítines masivos y el dispendio publicitario, se prioriza el trabajo a ras de suelo, el contacto directo en mercados y plazas públicas bajo la consigna de una campaña ciudadana libre de compromisos corporativos.</li>
      <li><strong>El valor estratégico de la minoría:</strong> Construir en el votante la convicción de que sufragar por una tercera opción no es un «voto perdido». Se apela a la pedagogía electoral: cada punto porcentual obtenido representa representación en el Cabildo, capacidad de contrapeso en regidurías y freno a las decisiones unilaterales del alcalde en turno.</li>
      <li><strong>Agenda temática hiperlocal:</strong> Abanderar problemáticas concretas y sensibles que los partidos grandes suelen evitar por compromisos previos, tales como la infraestructura de los centros de abasto (Mercado Tomasa Estévez y Barahona) o la seguridad inmediata del comercio establecido.</li>
      <li><strong>Activismo digital y guerrilla de contenido:</strong> Multiplicar el alcance sin grandes presupuestos mediante transmisiones directas, exhibición de fallas en servicios municipales y respuestas inmediatas en tiempo real a los eventos de los punteros.</li>
    </ul>

    <h2>2. El rol funcional en el sistema: Contención y dispersión del voto</h2>
    <p>Sin embargo, al analizar el tablero político desde la óptica de las estructuras tradicionales, perfiles como el de Gonzalo Campos y otros actores emergentes cumplen a menudo un rol funcional específico dentro del engranaje del sistema, más allá de la posibilidad aritmética de alcanzar la presidencia municipal:</p>

    <div class="bg-paper-2 border-l-4 border-spot p-5 my-6 rounded-r">
      <p class="font-serif italic text-ink m-0">«En elecciones cerradas, dos o tres puntos porcentuales no son un residuo: son la diferencia entre ganar o perder una plaza, y se convierten en la moneda de cambio más valiosa para la negociación post-electoral.»</p>
    </div>

    <ol>
      <li><strong>Contención y desgaste dirigido:</strong> Al concentrar los ataques y denuncias en un solo contrincante fuerte (por ejemplo, el oficialismo municipal), se desgasta la imagen del puntero sin que el rival antagónico principal tenga que asumir el costo político directo del ataque.</li>
      <li><strong>Dispersión del voto útil:</strong> Al presentarse como una vía alternativa para canalizar el voto de protesta, se fragmenta el universo de ciudadanos descontentos, impidiendo que el rechazo al gobierno en turno se concentre en un solo bloque opositor competitivo.</li>
      <li><strong>Legitimación del proceso democrático:</strong> La presencia de opciones críticas pero insertas en el marco institucional ofrece una apariencia de pluralidad y debate robusto, validando el resultado final de la contienda.</li>
      <li><strong>Negociación de capital futuro:</strong> La capacidad de movilizar sectores gremiales, redes vecinales o comerciantes permite acumular un porcentaje mínimo que, en el cómputo final, resulta indispensable para negociar posiciones administrativas o regidurías en el próximo gobierno.</li>
    </ol>

    <h2>3. La trampa de las denuncias mediáticas: El caso Tomasa Estévez</h2>
    <p>La interposición recurrente de denuncias ante la Fiscalía o la Contraloría que rara vez derivan en sanciones efectivas es una táctica clásica de la política instrumental. El Mercado Tomasa Estévez, con su rezago acumulado en seguridad, servicios y comercio informal, se convierte en el escenario predilecto para esta dinámica:</p>

    <p><strong>El efecto de desgaste prolongado:</strong> Dado que los procesos administrativos y judiciales tardan meses o años en desahogarse, el actor político mantiene vigente el mensaje de que <em>«la denuncia está puesta, pero las autoridades encubren la anomalía»</em>, transformando los tiempos burocráticos en combustible electoral.</p>

    <p><strong>Capitalización del desamparo:</strong> En un entorno donde los comerciantes resienten el abandono institucional, la interposición de recursos legales genera la ilusión de acompañamiento inmediato, capturando momentáneamente la simpatía de la base social y desincentivando esquemas de organización autónoma.</p>

    <p><strong>División del tejido social:</strong> La partidización de las demandas gremiales fractura a las uniones de locatarios. Mientras unos sectores buscan entablar mesas técnicas de negociación con el gobierno municipal, otros son empujados a la confrontación jurídica, debilitando la fuerza colectiva de los comerciantes.</p>

    <hr class="my-8 border-hairline" />

    <h2>4. La realidad del Mercado Tomasa Estévez: Radiografía de una crisis estructural</h2>
    <p>Inaugurado en 1972, el Mercado Tomasa Estévez es la central de abastos más relevante de Salamanca: alberga a más de <strong>700 locatarios formales</strong> y sostiene de manera directa e indirecta a miles de familias. No obstante, el inmueble enfrenta hoy una de sus etapas más críticas:</p>

    <ul>
      <li><strong>Inseguridad y extorsión:</strong> El cobro de piso y la violencia en zonas aledañas han golpeado gravemente la afluencia de compradores, con caídas reportadas de hasta un 50% en la actividad comercial tradicional.</li>
      <li><strong>Infraestructura al límite:</strong> Décadas sin una intervención integral han dejado un edificio con goteras crónicas, colapso en redes de drenaje sanitario, déficit crítico de estacionamiento y saturación en la recolección de residuos sólidos. Los mantenimientos parciales han resultado insuficientes frente a la necesidad de una modernización de fondo.</li>
      <li><strong>Desbordamiento del ambulantaje:</strong> Calles perimetrales emblemáticas —como Sánchez Torrado, Abasolo, 5 de Mayo y Avenida del Trabajo— han sido absorbidas por el comercio informal, generando severos cuellos de botella viales, fricciones cotidianas con los inspectores de fiscalización y una competencia asimétrica frente al locatario formal que cubre impuestos, derechos y servicios.</li>
    </ul>

    <h2>5. ¿Quién controla realmente el abasto en Salamanca?</h2>
    <p>Más allá de la administración formal del inmueble, el control económico y operativo del Tomasa Estévez se distribuye entre cuatro fuerzas con intereses cruzados:</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div class="p-4 bg-paper-2 rounded border border-hairline">
        <h4 class="font-bold text-ink mb-1">1. El control de facto</h4>
        <p class="text-sm text-ink2 m-0">Grupos que inciden mediante la extorsión sistemática en la cadena de distribución, determinando de forma indirecta qué proveedores ingresan y gravando ilegalmente los productos básicos.</p>
      </div>
      <div class="p-4 bg-paper-2 rounded border border-hairline">
        <h4 class="font-bold text-ink mb-1">2. Los liderazgos gremiales</h4>
        <p class="text-sm text-ink2 m-0">Uniones de comerciantes que gestionan el uso de pasillos, banquetas y espacios públicos en la periferia, con capacidad de veto y movilización frente a proyectos municipales de reordenamiento comercial.</p>
      </div>
      <div class="p-4 bg-paper-2 rounded border border-hairline">
        <h4 class="font-bold text-ink mb-1">3. Los mayoristas regionales</h4>
        <p class="text-sm text-ink2 m-0">Las centrales de abasto de León, Irapuato y estados vecinos (Michoacán, Puebla), que fijan los precios diarios de la canasta básica y condicionan el margen financiero de los detallistas salmantinos.</p>
      </div>
      <div class="p-4 bg-paper-2 rounded border border-hairline">
        <h4 class="font-bold text-ink mb-1">4. La autoridad municipal</h4>
        <p class="text-sm text-ink2 m-0">La Dirección de Fiscalización y la Jefatura de Mercados, cuyo margen de maniobra regulatoria se ve constantemente acotado por la resistencia social y los equilibrios políticos locales.</p>
      </div>
    </div>

    <h2>Conclusión: Entre la resiliencia y el espejismo electoral</h2>
    <p>El Mercado Tomasa Estévez es, en última instancia, el reflejo más fiel de las tensiones que atraviesan a Salamanca: una comunidad comercial de enorme resiliencia y arraigo histórico que, día a día, sostiene la alimentación y la economía del municipio, pero que permanece atrapada entre la disputa de poderes fácticos y el oportunismo de quienes reducen sus demandas a un libreto de campaña.</p>
    
    <p class="text-sm text-ink3 italic mt-6 border-t border-hairline pt-4">Artículo de análisis político y social por <strong>Jaime Ayala</strong>, corresponsalía y análisis regional para <em>San Miguel DAILY</em>.</p>
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
    category: 'politica',
    image_url: '/images/mercado_tomasa_estevez_salamanca.jpg',
    author_name: 'Jaime Ayala',
    created_at: new Date().toISOString(),
    published_at: new Date().toISOString()
  };

  let result;
  if (existingPost) {
    console.log(`Actualizando post existente con ID: ${existingPost.id}...`);
    result = await supabase
      .from('posts')
      .update(payload)
      .eq('id', existingPost.id)
      .select();
  } else {
    console.log("Insertando nuevo artículo...");
    result = await supabase
      .from('posts')
      .insert([payload])
      .select();
  }

  if (result.error) {
    console.error("Error al guardar el artículo:", result.error.message);
    process.exit(1);
  }

  console.log("✅ ARTÍCULO PUBLICADO CON ÉXITO EN SUPABASE!");
  console.log("ID:", result.data[0].id);
  console.log("Slug:", result.data[0].slug);
  console.log("URL:", `https://sanmigueldaily.com/p/${result.data[0].slug}`);
}

publishArticle();
