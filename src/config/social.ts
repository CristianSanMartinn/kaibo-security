import { getWhatsAppUrl } from "./site";

export type SocialPlatform = "whatsapp" | "tiktok" | "instagram";
export type SocialLink = {
  platform: SocialPlatform;
  label: string;
  href: string;
};

// Perfiles enlazados desde la página oficial; se retiran parámetros de seguimiento.
// Si cambian las cuentas, actualiza solo estas URLs.
export const socialLinks: SocialLink[] = [
  {
    platform: "whatsapp",
    label: "WhatsApp",
    href:
      getWhatsAppUrl(
        "Hola, quiero información sobre los cursos de Kaibo Security.",
      ) || "",
  },
  {
    platform: "tiktok",
    label: "TikTok",
    href: "https://www.tiktok.com/@kaibosecurity",
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/kaibosecurity/",
  },
];
