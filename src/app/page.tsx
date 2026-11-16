import LandingPage from "@/features/landing/components/LandingPage/LandingPage";

import { pageMetadata } from "@/features/courses/lib/course-pages";
import { siteConfig } from "@/config/site";

export const metadata = {
  ...pageMetadata(
    "Capacitación en seguridad privada en Santiago Centro",
    "Kaibo Security: cursos de guardia de seguridad, conserje, CCTV y bastón y esposas. Consulta programas e inscripción en Santiago Centro, cerca del Metro U. de Chile.",
    "/",
  ),
  // La página raíz no hereda la plantilla de título de su propio layout.
  title: {
    absolute:
      "Capacitación en seguridad privada en Santiago Centro | Kaibo Security",
  },
};

// Identidad de la empresa compartida con el proveedor de las fichas de cursos.
const organization = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": new URL("/#organizacion", siteConfig.url).href,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: new URL(siteConfig.logo.src, siteConfig.url).href,
  telephone: "+" + siteConfig.whatsapp,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Serrano 73, Oficina 910",
    addressLocality: "Santiago",
    addressRegion: "Región Metropolitana",
    addressCountry: "CL",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organization).replace(/</g, "\\u003c"),
        }}
      />
      <LandingPage />
    </>
  );
}
