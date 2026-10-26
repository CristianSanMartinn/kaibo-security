// HERO: conserva una portada fija. heroMedia.video permite activar el video cuando exista el archivo.
import type { HeroSlideData } from "../types/hero.types";

// Textos propuestos pendientes de aprobación.
export const heroSlides: HeroSlideData[] = [
  {
    id: "presentacion",
    label: "Kaibo Security",
    eyebrow: "FORMACIÓN EN SEGURIDAD PRIVADA",
    title: "La preparación marca",
    accent: "la diferencia.",
    description:
      "Formación para personas que buscan desarrollar sus conocimientos en seguridad privada. Conoce Kaibo Security y encuentra tu próximo paso.",
    action: { label: "Sobre nosotros", href: "#nosotros" },
    contactLabel: "Consultar por WhatsApp",
  },
  {
    id: "capacitaciones",
    label: "Capacitaciones",
    eyebrow: "CONOCIMIENTO PARA TU DESARROLLO",
    title: "Tu siguiente paso",
    accent: "empieza aquí.",
    description:
      "Explora nuestra propuesta de formación en seguridad privada. Consulta los contenidos y encuentra la capacitación que se ajuste a tus objetivos.",
    action: { label: "Ver cursos", href: "#cursos" },
    contactLabel: "Consultar por WhatsApp",
  },
  {
    id: "organizaciones",
    label: "Empresas",
    eyebrow: "FORMACIÓN PARA ORGANIZACIONES",
    title: "La preparación también",
    accent: "se construye en equipo.",
    description:
      "Conversemos sobre las necesidades de formación de tu organización y revisemos las alternativas de capacitación disponibles.",
    action: { label: "Ver capacitación para empresas", href: "#empresas" },
    contactLabel: "Contactar asesor",
  },
];

// Fondo único: cambiar video a una ruta local MP4/WebM cuando se entregue.
// La imagen generada es provisional y también servirá como poster del video.
export const heroMedia: { image: string; video: string | null } = {
  image: "/images/hero/kaibo-security-hero-provisional.webp",
  video: null,
};
