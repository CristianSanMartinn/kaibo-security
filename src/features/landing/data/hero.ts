// HERO: cada texto y sus acciones acompañan a la fotografía del mismo orden.
import type { HeroSlideData } from "../types/hero.types";

// Textos propuestos pendientes de aprobación.
export const heroSlides: HeroSlideData[] = [
  {
    id: "presentacion",
    label: "Kaibo Security",
    eyebrow: "FORMACIÓN EN SEGURIDAD PRIVADA",
    title: "Fórmate en",
    accent: "seguridad privada.",
    description:
      "Conoce nuestros cursos de Guardia de Seguridad, Conserje, CCTV y Bastón y Esposas. Consulta el programa y recibe orientación para inscribirte.",
    action: { label: "Ver cursos", href: "#cursos" },
    contactLabel: "Consultar por WhatsApp",
  },
  {
    id: "capacitaciones",
    label: "Capacitaciones",
    eyebrow: "NUESTROS CURSOS",
    title: "Conoce nuestros",
    accent: "cursos de seguridad.",
    description:
      "Explora nuestra propuesta de formación en seguridad privada. Consulta los contenidos y encuentra la capacitación que se ajuste a tus objetivos.",
    action: { label: "Ver cursos", href: "#cursos" },
    contactLabel: "Consultar por WhatsApp",
  },
  {
    id: "organizaciones",
    label: "Empresas",
    eyebrow: "PARA EMPRESAS",
    title: "Capacitación para",
    accent: "tu organización.",
    description:
      "Conversemos sobre las necesidades de formación de tu organización y revisemos las alternativas de capacitación disponibles.",
    action: { label: "Para mi empresa", href: "#empresas" },
    contactLabel: "Contactar asesor",
  },
];

// Usar las fotos originales para evitar una conversión con pérdida antes de Next Image.
// objectPosition permite ajustar el encuadre por foto.
export const heroMedia = {
  duration: 6000,
  images: [
    {
      src: "/images/hero/hero-supermercado.png",
      objectPosition: "center 40%",
    },
    {
      src: "/images/hero/hero-guardias-metro-santiago-v3.png",
      objectPosition: "70% top",
    },
    {
      src: "/images/hero/hero-3-original.jpg",
      objectPosition: "center top",
    },
  ],
};
