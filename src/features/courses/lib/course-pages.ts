import type { Metadata } from "next";
import type { Course } from "@/features/landing/types/course.types";
import { siteConfig } from "@/config/site";

export function coursePath(course: Course) {
  return "/cursos/" + course.slug;
}

export function formatPrice(price?: number) {
  return price === undefined
    ? "Consultar valor"
    : new Intl.NumberFormat("es-CL", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0,
      }).format(price);
}

export function courseWhatsApp(course: Course) {
  return (
    "https://wa.me/" +
    siteConfig.whatsapp.replace(/\D/g, "") +
    "?text=" +
    encodeURIComponent(
      "Hola, quiero información sobre el " +
        course.title +
        ". ¿Me pueden indicar las próximas fechas y las condiciones de inscripción?",
    )
  );
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  indexable = true,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: {
      index: siteConfig.indexable && indexable,
      follow: true,
      googleBot: {
        index: siteConfig.indexable && indexable,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: title + " | Kaibo Security",
      description,
      url: path,
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.openGraphImage.src,
          width: 1200,
          height: 630,
          alt: siteConfig.openGraphImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title + " | Kaibo Security",
      description,
      images: [siteConfig.openGraphImage.src],
    },
  };
}

export function breadcrumbData(course?: Course) {
  const items = [
    { name: "Inicio", path: "/" },
    { name: "Cursos", path: "/cursos" },
  ];
  if (course) items.push({ name: course.title, path: coursePath(course) });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteConfig.url).href,
    })),
  };
}
