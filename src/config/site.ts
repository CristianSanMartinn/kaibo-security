// CONTACTOS:
// Mantener únicamente datos confirmados oficialmente por el cliente.
// No inventar teléfonos, redes sociales, horarios ni direcciones.

// Horario centralizado.
// Se utiliza en Contact, Footer y eventualmente datos estructurados SEO.
export const officeHours = {
  days: "Lunes a viernes",
  opens: "09:00",
  closes: "16:00",
} as const;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";

export const siteConfig = {
  // =========================
  // IDENTIDAD
  // =========================

  name: "Kaibo Security",

  shortName: "Kaibo",

  description:
    "Cursos OS10 y capacitación profesional en seguridad privada para personas y organizaciones en Chile.",

  // =========================
  // SITIO / SEO
  // =========================

  url: siteUrl,

  locale: "es_CL",

  language: "es-CL",

  indexable:
    process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",

  // =========================
  // BRANDING
  // =========================

  logo: {
    src: "/images/branding/kaibo-logo.jpg",
    width: 1024,
    height: 1024,
    alt: "Kaibo Security",
  },

  openGraphImage: {
    src: "/og.png",
    width: 1200,
    height: 630,
    alt: "Kaibo Security - Formación en Seguridad Privada",
  },

  // =========================
  // CONTACTO
  // =========================

  whatsapp: "56957915145",

  email: "info@kaibosecurity.com",

  address: "Serrano 73, Oficina 910, Santiago",

  // =========================
  // HORARIO
  // =========================

  hours:
    `${officeHours.days}: ${officeHours.opens} a ${officeHours.closes}`,
} as const;

/**
 * Genera una URL de WhatsApp únicamente si el número configurado
 * tiene un formato válido.
 */
export function getWhatsAppUrl(
  message: string,
): string | null {
  const number =
    siteConfig.whatsapp.replace(/\D/g, "");

  if (!/^[1-9]\d{7,14}$/.test(number)) {
    return null;
  }

  return (
    `https://wa.me/${number}?text=` +
    encodeURIComponent(message)
  );
}