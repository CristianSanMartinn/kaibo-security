import CourseCatalog from "@/features/courses/components/CourseCatalog/CourseCatalog";
import {
  breadcrumbData,
  pageMetadata,
} from "@/features/courses/lib/course-pages";
import styles from "./page.module.css";
import { courses } from "@/features/landing/data/courses";
import { siteConfig } from "@/config/site";

export const metadata = pageMetadata(
 "Cursos OS10, CCTV y seguridad privada en Santiago",
  "Explora cursos OS10 para guardias, conserje, operación y monitoreo CCTV y bastón y esposas. Consulta valores, modalidades y próximas fechas en Kaibo Security.",
  "/cursos",
);

export default function CoursesPage() {
  return (
    <main
      id="contenido"
      tabIndex={-1}
      className={styles.root}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbData(),
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Cursos de Kaibo Security",
              itemListElement: courses.map((course, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: course.title,
                url: new URL("/cursos/" + course.slug, siteConfig.url).href,
              })),
            },
          ]).replace(/</g, "\\u003c"),
        }}
      />
      <CourseCatalog />
    </main>
  );
}
