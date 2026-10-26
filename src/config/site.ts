// CONTACTOS: completar con datos oficiales; los campos vacíos no crean enlaces ficticios.
// No activar contactos ni recursos hasta contar con confirmación del cliente.
// Horario publicado en el sitio oficial; editar aquí para actualizar también el Footer.
export const officeHours = {
  days: "Lunes a viernes",
  opens: "09:00",
  closes: "16:00",
};

export const siteConfig = {
  name: "Kaibo Security",
  description:
    "Formación y capacitación en seguridad privada para personas y organizaciones en Chile.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "",
  indexable: process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true",
  logo: {
    src: "/images/branding/kaibo-logo.jpg",
    width: 1024,
    height: 1024,
  } as null | { src: string; width: number; height: number },
  // Contacto indicado por el responsable del proyecto.
  whatsapp: "56957915145",
  email: "info@kaibosecurity.com",
  address: "Serrano 73, Oficina 910, Santiago",
  hours:
    officeHours.days + ": " + officeHours.opens + " a " + officeHours.closes,
};

export function getWhatsAppUrl(message: string): string | null {
  const number = siteConfig.whatsapp.replace(/\D/g, "");
  if (!/^[1-9]\d{7,14}$/.test(number)) return null;
  return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
}
