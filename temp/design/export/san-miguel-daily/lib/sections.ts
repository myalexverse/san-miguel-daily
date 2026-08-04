import type { L } from "./content";

export type SectionData = {
  slug: string;
  title: L;
  dek: L;
  editor: L;
  lead: { kicker: L; title: L; dek: L; byline: string; meta: L };
  cards: { kicker: L; title: L; meta: string }[];
  more: L[];
  indicators?: { label: L; value: string; delta: string; up: boolean }[];
};

export const sections: SectionData[] = [
  {
    slug: "san-miguel",
    title: { es: "San Miguel", en: "San Miguel" },
    dek: { es: "Cabildo, servicios, obra pública, agua y seguridad en el municipio de San Miguel de Allende.", en: "City hall, utilities, public works, water and safety in the municipality of San Miguel de Allende." },
    editor: { es: "Editora: Paulina Solís", en: "Editor: Paulina Solís" },
    lead: {
      kicker: { es: "Cabildo", en: "City hall" },
      title: { es: "El reglamento de rentas de corto plazo entra en vigor en enero", en: "The short-term rental rules take effect in January" },
      dek: { es: "Nueve votos contra cuatro. Registro obligatorio por unidad, tope de 180 noches al año y una cuota anual que irá al fondo de agua.", en: "Nine votes to four. Mandatory registration per unit, a 180-night annual cap and a yearly fee earmarked for the water fund." },
      byline: "Paulina Solís",
      meta: { es: "7 min", en: "7 min" },
    },
    cards: [
      { kicker: { es: "Servicios", en: "Utilities" }, title: { es: "La presa Allende cierra julio en 38% de su capacidad", en: "The Allende reservoir ends July at 38% of capacity" }, meta: "3 ago" },
      { kicker: { es: "Obra pública", en: "Public works" }, title: { es: "La repavimentación de la Salida a Celaya arranca el lunes", en: "Resurfacing of the Celaya road begins Monday" }, meta: "2 ago" },
      { kicker: { es: "Seguridad", en: "Safety" }, title: { es: "Detienen a tres por tala ilegal en la Cañada de la Virgen", en: "Three detained for illegal logging in Cañada de la Virgen" }, meta: "1 ago" },
    ],
    more: [
      { es: "El SAT abre módulo temporal en la calle Hidalgo", en: "Tax authority opens temporary office on Hidalgo street" },
      { es: "Se cancela el desfile del jueves por pronóstico de lluvia", en: "Thursday's parade cancelled over rain forecast" },
      { es: "Nuevo horario del Mercado de Martes a partir de septiembre", en: "New Tuesday Market hours starting in September" },
      { es: "La ciudad instala 40 luminarias en San Antonio", en: "The city installs 40 streetlights in San Antonio" },
    ],
  },
  {
    slug: "politica",
    title: { es: "Política", en: "Politics" },
    dek: { es: "Poder municipal y estatal, presupuesto, transparencia y la ruta hacia las elecciones de 2027.", en: "Municipal and state power, the budget, transparency and the road to the 2027 elections." },
    editor: { es: "Editora: Mariana Escobedo", en: "Editor: Mariana Escobedo" },
    lead: {
      kicker: { es: "Investigación", en: "Investigation" },
      title: { es: "Quién financia las campañas municipales de 2027", en: "Who is funding the 2027 municipal campaigns" },
      dek: { es: "Cuatro precandidatos, 61 aportantes y un padrón que no cuadra con el registro estatal. Seguimos el dinero durante seis semanas.", en: "Four pre-candidates, 61 donors and a roll that does not match the state registry. We followed the money for six weeks." },
      byline: "Mariana Escobedo y Paulina Solís",
      meta: { es: "14 min", en: "14 min" },
    },
    cards: [
      { kicker: { es: "Cabildo", en: "City hall" }, title: { es: "Aprueban el presupuesto 2027 con dos votos en contra", en: "The 2027 budget passes with two votes against" }, meta: "3 ago" },
      { kicker: { es: "Transparencia", en: "Transparency" }, title: { es: "La oposición pide auditoría a obra pública", en: "The opposition calls for an audit of public works" }, meta: "2 ago" },
      { kicker: { es: "Gobierno", en: "Government" }, title: { es: "Renuncia el titular de Desarrollo Urbano", en: "The urban development director resigns" }, meta: "31 jul" },
    ],
    more: [
      { es: "El Congreso estatal discute la ley de agua en septiembre", en: "The state congress takes up the water law in September" },
      { es: "Cinco regidores no reportaron sus declaraciones patrimoniales", en: "Five council members failed to file asset declarations" },
      { es: "Qué dice el fallo del tribunal sobre el fraccionamiento de la Cañada", en: "What the court ruling says about the Cañada development" },
      { es: "El municipio contrató 38 obras por adjudicación directa", en: "The city awarded 38 contracts without bidding" },
    ],
  },
  {
    slug: "economia",
    title: { es: "Economía", en: "Economy" },
    dek: { es: "Nearshoring, inversión inmobiliaria, empleo y precios en San Miguel de Allende y el corredor del Bajío.", en: "Nearshoring, real estate investment, employment and prices in San Miguel de Allende and the Bajío corridor." },
    editor: { es: "Editor: Roberto Lira", en: "Editor: Roberto Lira" },
    lead: {
      kicker: { es: "Análisis", en: "Analysis" },
      title: { es: "El peso, el nearshoring y las casas de dos millones de dólares", en: "The peso, nearshoring and the two-million-dollar houses" },
      dek: { es: "El precio medio por metro cuadrado en el Centro Histórico subió 41% en cuatro años. Quién compra, quién vende y qué pasa con los sueldos locales.", en: "The average price per square meter in the historic center rose 41% in four years. Who buys, who sells, and what happens to local wages." },
      byline: "Roberto Lira",
      meta: { es: "9 min", en: "9 min" },
    },
    cards: [
      { kicker: { es: "Inversión", en: "Investment" }, title: { es: "Cinco fondos de capital privado abren oficina en el corredor", en: "Five private equity funds open offices in the corridor" }, meta: "3 ago" },
      { kicker: { es: "Empleo", en: "Jobs" }, title: { es: "La hotelería busca 900 trabajadores para la temporada alta", en: "Hotels are looking for 900 workers for the high season" }, meta: "2 ago" },
      { kicker: { es: "Comercio", en: "Retail" }, title: { es: "Doce locales del Mercado Sano cambiaron de dueño en un año", en: "Twelve stalls at Mercado Sano changed hands in a year" }, meta: "1 ago" },
    ],
    more: [
      { es: "El aeropuerto de Querétaro suma vuelo directo a Houston", en: "Querétaro airport adds a direct flight to Houston" },
      { es: "Las remesas al municipio caen 4% por primera vez desde 2019", en: "Remittances to the municipality fall 4% for the first time since 2019" },
      { es: "Nearshoring: el mapa de las nuevas plantas del Bajío", en: "Nearshoring: mapping the Bajío's new plants" },
      { es: "Qué significa la nueva tarifa de agua para restaurantes", en: "What the new water tariff means for restaurants" },
    ],
    indicators: [
      { label: { es: "Peso / dólar", en: "Peso / dollar" }, value: "17.82", delta: "−1.4%", up: true },
      { label: { es: "Ocupación hotelera", en: "Hotel occupancy" }, value: "91%", delta: "+6 pts", up: true },
      { label: { es: "Tarifa media por noche", en: "Average nightly rate" }, value: "$5,840", delta: "+3.1%", up: true },
      { label: { es: "m² en Centro Histórico", en: "m² in historic center" }, value: "$64,300", delta: "+2.8%", up: false },
      { label: { es: "Empleo formal (IMSS)", en: "Formal jobs (IMSS)" }, value: "38,410", delta: "+412", up: true },
    ],
  },
  {
    slug: "cultura",
    title: { es: "Cultura", en: "Culture" },
    dek: { es: "Música, artes visuales, patrimonio, letras y los oficios que sostienen la ciudad.", en: "Music, visual arts, heritage, letters and the crafts that hold the city together." },
    editor: { es: "Editora: Ana Sofía Pardo", en: "Editor: Ana Sofía Pardo" },
    lead: {
      kicker: { es: "Música", en: "Music" },
      title: { es: "El Festival de Música de Cámara anuncia su edición 47 con seis estrenos", en: "The Chamber Music Festival announces its 47th edition with six premieres" },
      dek: { es: "Diez conciertos en el Teatro Ángela Peralta y dos en el Oratorio de San Felipe Neri, del 8 al 17 de agosto. Dos encargos son de compositoras mexicanas.", en: "Ten concerts at Teatro Ángela Peralta and two at the Oratorio de San Felipe Neri, August 8 to 17. Two commissions are by Mexican women composers." },
      byline: "Ana Sofía Pardo",
      meta: { es: "8 min", en: "8 min" },
    },
    cards: [
      { kicker: { es: "Patrimonio", en: "Heritage" }, title: { es: "Restauran tres murales del Centro Cultural Ignacio Ramírez", en: "Three murals at the Ignacio Ramírez cultural center are restored" }, meta: "2 ago" },
      { kicker: { es: "Letras", en: "Letters" }, title: { es: "La feria del libro suma 40 editoriales independientes", en: "The book fair adds 40 independent publishers" }, meta: "1 ago" },
      { kicker: { es: "Oficios", en: "Crafts" }, title: { es: "El oficio del cantero, en cuatro minutos", en: "The stonecutter's trade, in four minutes" }, meta: "30 jul" },
    ],
    more: [
      { es: "Cinco talleres de grabado abiertos al público este mes", en: "Five printmaking workshops open to the public this month" },
      { es: "Muere a los 91 años la maestra tejedora Guadalupe Ramírez", en: "Master weaver Guadalupe Ramírez dies at 91" },
      { es: "El Ángela Peralta reabre su segunda planta tras dos años", en: "The Ángela Peralta reopens its second floor after two years" },
      { es: "Galería: San Miguel a las cinco de la mañana", en: "Gallery: San Miguel at five in the morning" },
    ],
  },
  {
    slug: "turismo",
    title: { es: "Turismo", en: "Tourism" },
    dek: { es: "Hotelería, restaurantes, conectividad aérea, rentas y la relación de la ciudad con sus visitantes.", en: "Hotels, restaurants, air connectivity, rentals and the city's relationship with its visitors." },
    editor: { es: "Editora: Julia Wren", en: "Editor: Julia Wren" },
    lead: {
      kicker: { es: "Hotelería", en: "Hotels" },
      title: { es: "Los hoteles boutique del centro cierran julio con 91% de ocupación", en: "Boutique hotels downtown close July at 91% occupancy" },
      dek: { es: "La tarifa media por noche llegó a 5,840 pesos, un récord para temporada media. Doce establecimientos reportan lista de espera para el puente de septiembre.", en: "The average nightly rate reached 5,840 pesos, a record for the shoulder season. Twelve properties report waiting lists for the September long weekend." },
      byline: "Julia Wren",
      meta: { es: "5 min", en: "5 min" },
    },
    cards: [
      { kicker: { es: "Guía", en: "Guide" }, title: { es: "Doce restaurantes nuevos en la ciudad este verano", en: "Twelve new restaurants in the city this summer" }, meta: "3 ago" },
      { kicker: { es: "Conectividad", en: "Connectivity" }, title: { es: "Vuelo directo Querétaro–Houston desde octubre", en: "Direct Querétaro–Houston flight from October" }, meta: "2 ago" },
      { kicker: { es: "Rentas", en: "Rentals" }, title: { es: "Qué cambia para los anfitriones con el nuevo reglamento", en: "What changes for hosts under the new rules" }, meta: "1 ago" },
    ],
    more: [
      { es: "Tres rutas a pie por el Centro Histórico, sin multitudes", en: "Three walking routes through the historic center, without the crowds" },
      { es: "El festival de globos aerostáticos vuelve en noviembre", en: "The hot-air balloon festival returns in November" },
      { es: "Los viñedos del corredor suman dos hoteles de campo", en: "The corridor's vineyards add two country hotels" },
      { es: "Cómo llegar desde el aeropuerto de León en 2026", en: "How to get here from León airport in 2026" },
    ],
  },
];

export function getSection(slug: string) {
  return sections.find((s) => s.slug === slug);
}
