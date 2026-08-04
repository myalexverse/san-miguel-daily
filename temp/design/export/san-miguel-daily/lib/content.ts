export type L = { es: string; en: string };
export type Story = { kicker: L; title: L; dek?: L; byline?: string; meta?: L; slot?: string };

export const nav: { slug: string; label: L }[] = [
  { slug: "san-miguel", label: { es: "San Miguel", en: "San Miguel" } },
  { slug: "politica", label: { es: "Política", en: "Politics" } },
  { slug: "economia", label: { es: "Economía", en: "Economy" } },
  { slug: "cultura", label: { es: "Cultura", en: "Culture" } },
  { slug: "turismo", label: { es: "Turismo", en: "Tourism" } },
];

export const breaking: L = {
  es: "Cabildo aprueba el reglamento de rentas de corto plazo por nueve votos contra cuatro",
  en: "City council approves short-term rental rules, nine votes to four",
};

export const heroStory: Story = {
  kicker: { es: "Movilidad", en: "Mobility" },
  title: {
    es: "El tren ligero a Querétaro pondría a San Miguel a 40 minutos del Bajío industrial",
    en: "The light rail to Querétaro would put San Miguel 40 minutes from the industrial Bajío",
  },
  dek: {
    es: "La concesión firmada el viernes contempla siete estaciones y una inversión de 18 mil millones de pesos. Los hoteleros del centro calculan un alza de 12% en la ocupación de fin de semana.",
    en: "The concession signed on Friday includes seven stations and an 18-billion-peso investment. Hoteliers downtown expect weekend occupancy to rise 12%.",
  },
  byline: "Mariana Escobedo",
  meta: { es: "6 min de lectura", en: "6 min read" },
};

export const secondary: Story[] = [
  {
    kicker: { es: "Economía", en: "Economy" },
    title: { es: "Cinco fondos de capital privado abren oficina en el corredor Guanajuato–Querétaro", en: "Five private equity funds open offices in the Guanajuato–Querétaro corridor" },
    dek: { es: "El nearshoring dejó de ser una promesa: la región suma 4,100 empleos formales en el año.", en: "Nearshoring is no longer a promise: the region added 4,100 formal jobs this year." },
  },
  {
    kicker: { es: "Turismo", en: "Tourism" },
    title: { es: "Los hoteles boutique del centro cierran julio con 91% de ocupación", en: "Boutique hotels downtown close July at 91% occupancy" },
    dek: { es: "La tarifa promedio por noche superó los 5,800 pesos, un récord para temporada media.", en: "The average nightly rate topped 5,800 pesos, a record for the shoulder season." },
  },
  {
    kicker: { es: "Cultura", en: "Culture" },
    title: { es: "El Festival de Música de Cámara anuncia su edición 47 con seis estrenos", en: "The Chamber Music Festival announces its 47th edition with six premieres" },
    dek: { es: "Diez conciertos en el Teatro Ángela Peralta y dos en el Oratorio de San Felipe Neri.", en: "Ten concerts at Teatro Ángela Peralta and two at the Oratorio de San Felipe Neri." },
  },
];

export const trending: L[] = [
  { es: "Qué cambia con el nuevo reglamento de rentas en el Centro Histórico", en: "What changes under the new rental rules in the historic center" },
  { es: "El agua de San Miguel: cinco gráficas sobre la presa Allende", en: "San Miguel's water: five charts on the Allende reservoir" },
  { es: "Guía: doce restaurantes nuevos en la ciudad este verano", en: "Guide: twelve new restaurants in the city this summer" },
  { es: "Quién financia las campañas municipales de 2027", en: "Who is funding the 2027 municipal campaigns" },
  { es: "El peso, el nearshoring y las casas de dos millones de dólares", en: "The peso, nearshoring and the two-million-dollar houses" },
];

export const latest: { time: string; title: L }[] = [
  { time: "07:40", title: { es: "Se restablece el suministro de agua en Guadiana y San Antonio", en: "Water service restored in Guadiana and San Antonio" } },
  { time: "08:15", title: { es: "El SAT abre módulo temporal en la calle Hidalgo", en: "Tax authority opens temporary office on Hidalgo street" } },
  { time: "09:02", title: { es: "Detienen a tres personas por tala ilegal en la Cañada de la Virgen", en: "Three detained for illegal logging in Cañada de la Virgen" } },
  { time: "10:30", title: { es: "El aeropuerto de Querétaro suma vuelo directo a Houston", en: "Querétaro airport adds a direct flight to Houston" } },
  { time: "11:05", title: { es: "Se cancela el desfile del jueves por pronóstico de lluvia", en: "Thursday's parade cancelled over rain forecast" } },
];

export const opinion: { author: string; initials: string; title: L }[] = [
  { author: "Ana Sofía Pardo", initials: "AP", title: { es: "Un pueblo mágico no puede vivir de la nostalgia", en: "A magic town cannot live on nostalgia" } },
  { author: "Roberto Lira", initials: "RL", title: { es: "El presupuesto municipal necesita auditoría, no defensa", en: "The city budget needs an audit, not a defense" } },
  { author: "Julia Wren", initials: "JW", title: { es: "Lo que los extranjeros no entendemos del agua", en: "What we foreigners fail to understand about water" } },
];

export const videos: { length: string; title: L }[] = [
  { length: "4:12", title: { es: "El oficio del cantero, en cuatro minutos", en: "The stonecutter's trade, in four minutes" } },
  { length: "7:35", title: { es: "Recorrido: la restauración de la Parroquia", en: "Walkthrough: restoring the Parroquia" } },
  { length: "3:08", title: { es: "Cómo se hace el pan de Nomé", en: "How the bread at Nomé is made" } },
];

export const events: { day: string; month: L; title: L; place: string }[] = [
  { day: "08", month: { es: "Ago", en: "Aug" }, title: { es: "Festival de Música de Cámara", en: "Chamber Music Festival" }, place: "Teatro Ángela Peralta · 20:00" },
  { day: "09", month: { es: "Ago", en: "Aug" }, title: { es: "Mercado de productores", en: "Farmers' market" }, place: "Parque Juárez · 09:00" },
  { day: "12", month: { es: "Ago", en: "Aug" }, title: { es: "Charla: nearshoring en el Bajío", en: "Talk: nearshoring in the Bajío" }, place: "Casa Europa · 18:30" },
];

export const article = {
  kicker: { es: "Movilidad · Reportaje", en: "Mobility · Feature" } as L,
  title: heroStory.title,
  dek: {
    es: "La concesión firmada el viernes contempla siete estaciones y una inversión de 18 mil millones de pesos. Quedan por resolver el derecho de vía y el agua.",
    en: "The concession signed on Friday includes seven stations and an 18-billion-peso investment. Right of way and water remain unresolved.",
  } as L,
  author: "Mariana Escobedo",
  initials: "ME",
  date: { es: "3 de agosto de 2026 · 08:10", en: "August 3, 2026 · 08:10" } as L,
  caption: {
    es: "Vista del kilómetro cero del trazo propuesto, a la altura del libramiento. Fotografía de Emilio Zúñiga.",
    en: "The proposed route's kilometer zero, near the bypass. Photograph by Emilio Zúñiga.",
  } as L,
  free: [
    { es: "La firma ocurrió sin ceremonia. El viernes por la tarde, en una sala de la Secretaría de Movilidad en Guanajuato capital, el gobierno del estado y un consorcio encabezado por dos constructoras mexicanas cerraron la concesión de un tren ligero de 71 kilómetros entre San Miguel de Allende y el centro de Querétaro.", en: "The signing happened without ceremony. On Friday afternoon, in a room at the Mobility Ministry in Guanajuato city, the state government and a consortium led by two Mexican builders closed the concession for a 71-kilometer light rail line between San Miguel de Allende and central Querétaro." },
    { es: "El contrato prevé siete estaciones, una inversión de 18 mil millones de pesos y un plazo de operación de treinta años. Si el calendario se cumple —y en obras de esta escala rara vez se cumple— el primer tren correría en el otoño de 2030.", en: "The contract calls for seven stations, an 18-billion-peso investment and a thirty-year operating term. If the schedule holds — and on projects this size it rarely does — the first train would run in the autumn of 2030." },
    { es: "Para San Miguel, el cálculo es doble. Por un lado, cuarenta minutos a un corredor industrial que produce uno de cada cinco automóviles del país. Por el otro, la presión sobre una ciudad de 175 mil habitantes que ya recibe 1.4 millones de visitantes al año.", en: "For San Miguel, the calculation cuts two ways. On one hand, forty minutes to an industrial corridor that builds one in five cars made in Mexico. On the other, pressure on a city of 175,000 that already receives 1.4 million visitors a year." },
  ] as L[],
  quote: {
    text: { es: "“No es un proyecto de turismo. Es un proyecto de vivienda, y todavía nadie lo dice en voz alta.”", en: "“This is not a tourism project. It is a housing project, and nobody is saying that out loud yet.”" } as L,
    source: { es: "Claudia Rentería, urbanista, Universidad de Guanajuato", en: "Claudia Rentería, urban planner, Universidad de Guanajuato" } as L,
  },
  paid: [
    { es: "Los dos puntos que el contrato no resuelve son el derecho de vía en el tramo de Comonfort y el suministro de agua para los talleres de mantenimiento, un consumo estimado en 40 mil metros cúbicos al año en una cuenca que ya opera en déficit.", en: "The two points the contract leaves open are the right of way through the Comonfort stretch and water for the maintenance yards — an estimated 40,000 cubic meters a year in a basin already running a deficit." },
    { es: "Los hoteleros del centro histórico, consultados el sábado, calculan un alza de 12% en la ocupación de fin de semana. La Cámara de Comercio pide, a cambio, un plan de estacionamientos periféricos antes de la primera piedra.", en: "Hoteliers in the historic center, surveyed on Saturday, expect weekend occupancy to rise 12%. The chamber of commerce is asking, in exchange, for a peripheral parking plan before ground is broken." },
    { es: "La consulta pública abre el 20 de agosto y cierra el 30 de septiembre. Hasta entonces, el trazo definitivo sigue siendo un dibujo.", en: "Public consultation opens August 20 and closes September 30. Until then, the final route remains a drawing." },
  ] as L[],
  related: [
    { es: "El agua de San Miguel: cinco gráficas sobre la presa Allende", en: "San Miguel's water: five charts on the Allende reservoir" },
    { es: "Quién financia las campañas municipales de 2027", en: "Who is funding the 2027 municipal campaigns" },
    { es: "Nearshoring: el mapa de las nuevas plantas del Bajío", en: "Nearshoring: mapping the Bajío's new plants" },
  ] as L[],
};
