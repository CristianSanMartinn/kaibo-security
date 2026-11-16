import { Suspense } from "react";
import { notFound } from "next/navigation";
import { courses } from "@/features/landing/data/courses";
import CoursePage from "@/features/courses/components/CoursePage/CoursePage";
import {
  breadcrumbData,
  coursePath,
  pageMetadata,
} from "@/features/courses/lib/course-pages";
import { siteConfig } from "@/config/site";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

// Las fichas se generan desde el arreglo de cursos, sin duplicar páginas a mano.
export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  if (!course) notFound();
  return pageMetadata(
    course.seo?.title || course.title,
    course.seo?.description || course.description,
    coursePath(course),
    course.indexable,
  );
}

// Resolver la URL dentro de Suspense permite mostrar la ficha sin bloquear la navegación.
async function CourseDetailContent({ params }: Props) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);
  if (!course) notFound();
  const schema = [
    breadcrumbData(course),
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: course.title,
      description: course.description,
      url: new URL(coursePath(course), siteConfig.url).href,
      inLanguage: "es-CL",
      image: new URL(course.image, siteConfig.url).href,
      provider: {
        "@type": "EducationalOrganization",
        "@id": new URL("/#organizacion", siteConfig.url).href,
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  ];
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <CoursePage course={course} />
    </>
  );
}

export default function CourseDetailPage({ params }: Props) {
  return (
    <main
      id="contenido"
      tabIndex={-1}
      className={styles.root}
      data-course-page
    >
      <Suspense
        fallback={
          <div
            className={styles.loading}
            role="status"
          >
            <p>Cargando información del curso…</p>
            <div
              className={styles.loadingLayout}
              aria-hidden="true"
            >
              <div className={styles.loadingPhoto} />
              <div className={styles.loadingSummary} />
            </div>
          </div>
        }
      >
        <CourseDetailContent params={params} />
      </Suspense>
    </main>
  );
}
