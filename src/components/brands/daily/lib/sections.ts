import type { L } from "./content";

export type SectionData = {
  slug: string;
  title: L;
  dek: L;
  editor: L;
  lead: { kicker: L; title: L; dek: L; byline: string; meta: L; image?: string };
  cards: { kicker: L; title: L; meta: string }[];
  more: L[];
  indicators?: { label: L; value: string; delta: string; up: boolean }[];
  opinion?: { author: string; photo: string; title: L; dek?: L; meta: L };
  investigation?: { title: L; dek: L; photo: string };
  video?: { title: L; photo: string };
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
      meta: { es: "7 min de lectura", en: "7 min read" },
      image: "/images/sma_rentas_cortas_1785865302929.jpg"
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
    opinion: {
      author: "Ana Sofía Pardo",
      photo: "/images/authors/ana.jpg",
      title: { es: "Un pueblo mágico no puede vivir de la nostalgia", en: "A magic town cannot live on nostalgia" },
      dek: { es: "Es urgente pensar en el futuro urbano antes de que la ciudad nos rebase.", en: "It is urgent to think about the urban future before the city overtakes us." },
      meta: { es: "4 min de lectura", en: "4 min read" }
    },
    investigation: {
      title: { es: "San Miguel: ¿qué sigue frente al crecimiento urbano?", en: "San Miguel: what's next in the face of urban growth?" },
      dek: { es: "Un análisis sobre los retos de infraestructura y movilidad.", en: "An analysis of infrastructure and mobility challenges." },
      photo: "/images/sma_parroquia_1785796991707.jpg"
    },
    video: {
      title: { es: "Rueda de prensa en el Palacio Municipal", en: "Press conference at City Hall" },
      photo: "/images/sma_presidencia_municipal_1785868646306.jpg"
    }
  },
  {
    slug: "politica",
    title: { es: "Política", en: "Politics" },
    dek: { es: "Poder municipal y estatal, presupuesto, transparencia y la ruta hacia las elecciones de 2027.", en: "Municipal and state power, the budget, transparency and the road to the 2027 elections." },
    editor: { es: "Editora: Ana Paula García", en: "Editor: Ana Paula García" },
    lead: {
      kicker: { es: "ÚLTIMA HORA", en: "BREAKING" },
      title: { es: "Aprueba Cabildo el presupuesto municipal de 2027 con enfoque en servicios públicos y desarrollo", en: "City Council approves 2027 municipal budget focusing on public services and development" },
      dek: { es: "El Ayuntamiento de San Miguel de Allende aprobó por mayoría el proyecto de presupuesto para 2027, que prioriza obra social, movilidad, seguridad y sostenibilidad.", en: "The San Miguel de Allende City Council approved by majority the budget project for 2027, prioritizing social works, mobility, security and sustainability." },
      byline: "Ana Paula García",
      meta: { es: "12 NOV 2026 · 5 min de lectura", en: "12 NOV 2026 · 5 min read" },
      image: "/images/sma_presidencia_municipal_1785868646306.jpg"
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
    opinion: {
      author: "Dr. Manuel Rodríguez",
      photo: "/images/authors/roberto.jpg",
      title: { es: "El municipio que queremos", en: "The municipality we want" },
      dek: { es: "San Miguel tiene hoy la oportunidad de consolidar un gobierno más cercano, transparente y moderno.", en: "San Miguel has the opportunity today to consolidate a closer, more transparent and modern government." },
      meta: { es: "3 min de lectura", en: "3 min read" }
    },
    investigation: {
      title: { es: "San Miguel: ¿qué sigue frente al crecimiento urbano?", en: "San Miguel: what's next in the face of urban growth?" },
      dek: { es: "Un análisis sobre los retos de infraestructura, movilidad y calidad de vida para los próximos años.", en: "An analysis of infrastructure, mobility and quality of life challenges for the coming years." },
      photo: "/images/sma_parroquia_1785796991707.jpg"
    },
    video: {
      title: { es: "Rueda de prensa en el Palacio Municipal", en: "Press conference at City Hall" },
      photo: "/images/sma_presidencia_municipal_1785868646306.jpg"
    }
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
      meta: { es: "9 min de lectura", en: "9 min read" },
      image: "/images/sma_luxury_realestate_1785869611914.jpg"
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
    opinion: {
      author: "Roberto Lira",
      photo: "/images/authors/roberto.jpg",
      title: { es: "El presupuesto municipal necesita auditoría, no defensa", en: "The city budget needs an audit, not a defense" },
      dek: { es: "Los números de la reciente obra pública muestran inconsistencias claras.", en: "The numbers from recent public works show clear inconsistencies." },
      meta: { es: "6 min de lectura", en: "6 min read" }
    },
    investigation: {
      title: { es: "Costo de vida: el impacto del nearshoring en las rentas", en: "Cost of living: nearshoring's impact on rents" },
      dek: { es: "Datos exclusivos sobre el aumento de precios en 2026.", en: "Exclusive data on the price increases in 2026." },
      photo: "/images/sma_rentas_cortas_1785865302929.jpg"
    },
    video: {
      title: { es: "Entrevista: el futuro del Bajío industrial", en: "Interview: the future of the industrial Bajío" },
      photo: "/images/sma_luxury_realestate_1785869611914.jpg"
    }
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
      meta: { es: "8 min de lectura", en: "8 min read" },
      image: "/images/sma_concert.jpg"
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
    opinion: {
      author: "Ana Sofía Pardo",
      photo: "/images/authors/ana.jpg",
      title: { es: "El arte local contra la gentrificación", en: "Local art against gentrification" },
      dek: { es: "Cómo los artistas sanmiguelenses resisten a través de sus oficios.", en: "How San Miguel artists resist through their crafts." },
      meta: { es: "5 min de lectura", en: "5 min read" }
    },
    investigation: {
      title: { es: "El legado del maestro cantero de la Parroquia", en: "The legacy of the Parroquia's master stonecutter" },
      dek: { es: "Una mirada profunda a la restauración de nuestro mayor símbolo.", en: "A deep look at the restoration of our greatest symbol." },
      photo: "/images/sma_parroquia_1785796991707.jpg"
    },
    video: {
      title: { es: "En vivo desde el FASMA 2026", en: "Live from FASMA 2026" },
      photo: "/images/sma_fasma.jpg"
    }
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
      meta: { es: "5 min de lectura", en: "5 min read" },
      image: "/images/sma_restaurantes_1785868112448.jpg"
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
    opinion: {
      author: "Julia Wren",
      photo: "/images/authors/julia.jpg",
      title: { es: "Lo que los extranjeros no entendemos del agua", en: "What we foreigners fail to understand about water" },
      dek: { es: "La responsabilidad del turista en la crisis hídrica de la región.", en: "The tourist's responsibility in the region's water crisis." },
      meta: { es: "7 min de lectura", en: "7 min read" }
    },
    investigation: {
      title: { es: "Impacto ambiental del turismo masivo", en: "Environmental impact of mass tourism" },
      dek: { es: "Datos alarmantes sobre el consumo desmedido en temporada alta.", en: "Alarming data on excessive consumption during high season." },
      photo: "/images/sma_water_1785797016285.jpg"
    },
    video: {
      title: { es: "Ruta de viñedos recomendados 2026", en: "Recommended vineyards route 2026" },
      photo: "/images/sma_restaurantes_1785868112448.jpg"
    }
  },
];

export function getSection(slug: string) {
  return sections.find((s) => s.slug === slug);
}
