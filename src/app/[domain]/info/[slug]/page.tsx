import { notFound } from "next/navigation";
import Image from "next/image";
import { SiteHeader } from "@/components/brands/daily/SiteHeader";
import { Footer } from "@/components/brands/daily/Footer";
import { Paywall } from "@/components/brands/daily/Paywall";
import { MenuOverlay } from "@/components/brands/daily/MenuOverlay";
import { MobileTabBar } from "@/components/brands/daily/MobileTabBar";

type InfoPage = {
  title: string;
  image: string;
  content: React.ReactNode;
};

const pagesData: Record<string, InfoPage> = {
  "quienes-somos": {
    title: "Quiénes somos",
    image: "/brands/daily/info_about_us.jpg",
    content: (
      <>
        <p className="mb-6 text-lg leading-relaxed text-ink2">
          San Miguel DAILY nace con una misión clara: ofrecer periodismo local con un estándar internacional. En una de las ciudades más cosmopolitas de México, nuestra redacción trabaja bajo la premisa de que la información verificada es el pilar de una comunidad fuerte.
        </p>
        <p className="mb-6 text-lg leading-relaxed text-ink2">
          Somos un equipo de reporteros, editores y fotógrafos comprometidos con narrar la vida pública, económica y cultural de San Miguel de Allende. Nos alejamos del sensacionalismo y priorizamos la profundidad, el análisis y la calidad narrativa.
        </p>
        <h3 className="mb-4 mt-12 text-2xl font-semibold text-ink">Nuestra Misión</h3>
        <p className="mb-6 text-lg leading-relaxed text-ink2">
          Proveer a nuestros lectores de información precisa, útil y contextualmente rica que les permita tomar decisiones informadas y entender mejor la evolución de nuestra ciudad.
        </p>
      </>
    ),
  },
  "codigo-editorial": {
    title: "Código editorial",
    image: "/brands/daily/info_editorial_code.jpg",
    content: (
      <>
        <p className="mb-6 text-lg leading-relaxed text-ink2">
          La confianza de nuestros lectores es nuestro activo más valioso. Por ello, en San Miguel DAILY nos regimos por un estricto código de ética profesional.
        </p>
        <h3 className="mb-4 mt-8 text-2xl font-semibold text-ink">1. Independencia</h3>
        <p className="mb-6 text-lg leading-relaxed text-ink2">
          Nuestras decisiones editoriales no están dictadas por intereses políticos ni presiones comerciales. Separamos claramente la información periodística de la opinión y del contenido publicitario.
        </p>
        <h3 className="mb-4 mt-8 text-2xl font-semibold text-ink">2. Verificación de Datos (Fact-Checking)</h3>
        <p className="mb-6 text-lg leading-relaxed text-ink2">
          La precisión está por encima de la inmediatez. No publicamos rumores y trabajamos arduamente para corroborar toda la información con fuentes de primera mano antes de su publicación.
        </p>
        <h3 className="mb-4 mt-8 text-2xl font-semibold text-ink">3. Rectificación</h3>
        <p className="mb-6 text-lg leading-relaxed text-ink2">
          Cuando cometemos un error, lo reconocemos de manera pública y lo corregimos con la misma visibilidad con la que se publicó la nota original.
        </p>
      </>
    ),
  },
  "contacto": {
    title: "Contacto",
    image: "/brands/daily/info_contact.jpg",
    content: (
      <>
        <p className="mb-6 text-lg leading-relaxed text-ink2">
          Estamos siempre abiertos a escuchar a nuestros lectores, recibir denuncias ciudadanas y responder a tus dudas corporativas.
        </p>
        <div className="my-10 border-l-2 border-spot pl-6">
          <h4 className="mb-2 font-semibold text-ink">Redacción Principal</h4>
          <p className="text-ink2">
            Calle Zacateros 44<br />
            Zona Centro<br />
            San Miguel de Allende, Gto. 37700
          </p>
        </div>
        <h3 className="mb-4 mt-8 text-2xl font-semibold text-ink">Correos Electrónicos</h3>
        <ul className="mb-6 list-inside list-disc text-lg leading-relaxed text-ink2">
          <li className="mb-2"><strong>Noticias y denuncias:</strong> redaccion@sanmigueldaily.com</li>
          <li className="mb-2"><strong>Atención a suscriptores:</strong> soporte@sanmigueldaily.com</li>
          <li className="mb-2"><strong>Bolsa de trabajo:</strong> talento@sanmigueldaily.com</li>
        </ul>
      </>
    ),
  },
  "publicidad": {
    title: "Publicidad",
    image: "/brands/daily/info_advertising.jpg",
    content: (
      <>
        <p className="mb-6 text-lg leading-relaxed text-ink2">
          Anunciarse en San Miguel DAILY significa asociar tu marca con credibilidad, prestigio y un público lector de alto poder adquisitivo.
        </p>
        <p className="mb-6 text-lg leading-relaxed text-ink2">
          Nuestra audiencia está compuesta por tomadores de decisiones, residentes locales, la comunidad expatriada y turistas frecuentes que buscan recomendaciones de estilo de vida, bienes raíces y cultura.
        </p>
        <h3 className="mb-4 mt-12 text-2xl font-semibold text-ink">Soluciones Comerciales</h3>
        <ul className="mb-6 list-inside list-disc text-lg leading-relaxed text-ink2">
          <li className="mb-2"><strong>Display Premium:</strong> Banners estratégicamente posicionados que no interrumpen la lectura.</li>
          <li className="mb-2"><strong>Publirreportajes (Branded Content):</strong> Contenido patrocinado narrado con nuestra calidad editorial.</li>
          <li className="mb-2"><strong>Patrocinio de Boletín:</strong> Presencia exclusiva en nuestro Newsletter diario directo a miles de bandejas de entrada.</li>
        </ul>
        <div className="my-10 bg-paper-subtle p-8 text-center">
          <p className="mb-4 font-semibold text-ink">Solicita nuestro Media Kit 2026</p>
          <a href="mailto:ventas@sanmigueldaily.com" className="font-semibold text-spot hover:underline">
            ventas@sanmigueldaily.com
          </a>
        </div>
      </>
    ),
  },
};

export default async function InfoPage({ params }: { params: Promise<{ domain: string, slug: string }> }) {
  const { slug } = await params;
  const page = pagesData[slug];

  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteHeader variant="slim" />
      
      <main className="mx-auto max-w-4xl px-5 py-12 md:px-16 md:py-24">
        <header className="mb-12 text-center">
          <h1 className="mb-8 text-4xl font-bold tracking-tight md:text-6xl">{page.title}</h1>
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-hairline">
            <Image 
              src={page.image} 
              alt={page.title} 
              fill 
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </header>

        <article className="mx-auto max-w-2xl">
          {page.content}
        </article>
      </main>

      <Footer />
      <Paywall />
      <MenuOverlay />
      <MobileTabBar />
    </div>
  );
}
