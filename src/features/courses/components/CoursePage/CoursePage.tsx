import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown, MessageCircle, ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container/Container";
import { officeHours, siteConfig } from "@/config/site";
import type { Course } from "@/features/landing/types/course.types";
import { courseWhatsApp, formatPrice } from "../../lib/course-pages";
import styles from "./CoursePage.module.css";

type Props = { course: Course };

// Conserva el párrafo original y convierte únicamente la dirección en enlace.
function withAddressLink(text: string) {
  const address = /Serrano 73, (?:piso 9, )?oficina 910(?:, Santiago Centro)?/i;
  const match = address.exec(text);

  if (!match) return text;

  return (
    <>
      {text.slice(0, match.index)}
      <a
        className={styles.addressLink}
        href={
          "https://www.google.com/maps/search/?api=1&query=" +
          encodeURIComponent(siteConfig.address + ", Chile")
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        {match[0]}
        <span className="sr-only">
          {" "}
          (abre Google Maps en una pestaña nueva)
        </span>
      </a>
      {text.slice(match.index + match[0].length)}
    </>
  );
}

export default function CoursePage({ course }: Props) {
  const whatsapp = courseWhatsApp(course);
  // El programa confirmado se reutiliza desde los datos existentes del curso.
  const learning =
    course.contents ||
    course.sections?.find((section) => section.title === "¿Qué aprenderás?")
      ?.items;
  const audience = course.sections?.find(
    (section) => section.title === "¿A quién está dirigido?",
  );
  const enrollment =
    course.sections?.filter(
      (section) =>
        !["¿Qué aprenderás?", "¿A quién está dirigido?"].includes(
          section.title,
        ),
    ) || [];
  const facts = [
    { label: "Modalidad", value: course.modality },
    { label: "Duración", value: course.duration },
    {
      label: "Valor",
      value: formatPrice(course.price),
      pending: course.price === undefined,
    },
    {
      label: "Próximas fechas",
      value: course.startDate
        ? new Intl.DateTimeFormat("es-CL", {
            dateStyle: "long",
            timeZone: "UTC",
          }).format(new Date(course.startDate + "T12:00:00Z"))
        : undefined,
    },
    { label: "Horario", value: course.schedule },
  ];

  return (
    <>
      <div className={styles.breadcrumbStrip}>
        <Container>
          <nav
            className={styles.breadcrumb}
            aria-label="Migas de pan"
          >
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/cursos">Cursos</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{course.title}</span>
          </nav>
        </Container>
      </div>

      <section
        className={styles.main}
        aria-labelledby="course-title"
      >
        <Container className={styles.layout}>
          <header className={styles.heading}>
            <p className={styles.category}>{course.category}</p>
            <h1 id="course-title">{course.title}</h1>
            <p className={styles.lead}>
              {course.seo?.introduction || course.description}
            </p>
          </header>

          <figure className={styles.photo}>
            <div className={styles.photoFrame}>
              <Image
                src={course.image}
                alt={course.imageAlt}
                fill
                sizes="(min-width: 80rem) 740px, (min-width: 64rem) 60vw, 92vw"
              />
            </div>
            <figcaption>
              Imagen ilustrativa del área de capacitación.
            </figcaption>
          </figure>

          {/* Datos que influyen en la inscripción: siempre visibles, nunca en un desplegable. */}
          <aside
            className={styles.summary}
            aria-labelledby="course-summary-title"
          >
            <h2 id="course-summary-title">Resumen del curso</h2>
            <dl className={styles.facts}>
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd data-pending={!fact.value || fact.pending}>
                    {fact.value || "Consultar"}
                    {fact.label === "Valor" && course.price !== undefined && (
                      <small> CLP</small>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <p className={styles.note}>
              Confirma la próxima convocatoria y las condiciones vigentes por
              WhatsApp antes de realizar un pago.
            </p>
            <a
              className={styles.whatsapp}
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle
                size={19}
                aria-hidden="true"
              />
              Consultar por este curso
              <span className="sr-only"> (abre una pestaña nueva)</span>
            </a>
            <p className={styles.hours}>
              Atendemos {officeHours.days.toLowerCase()}, de {officeHours.opens}{" "}
              a {officeHours.closes}.
            </p>
          </aside>

          <div className={styles.body}>
            <section
              id="requisitos"
              className={styles.requirements}
              aria-labelledby="course-requirements-title"
            >
              <h2 id="course-requirements-title">Requisitos de ingreso</h2>
              {course.requirements?.length ? (
                <ul>
                  {course.requirements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  Consulta los requisitos y documentos de ingreso antes de
                  inscribirte.
                </p>
              )}
            </section>
            {course.modalityNote && (
              <p className={styles.note}>{course.modalityNote}</p>
            )}
            <section aria-labelledby="course-learning-title">
              <h2 id="course-learning-title">Qué aprenderás</h2>
              {course.detail !== course.description && <p>{course.detail}</p>}
              {learning?.length ? (
                <ul className={styles.learning}>
                  {learning.map((item) => (
                    <li key={item}>
                      <Check
                        size={18}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  Solicita a nuestro equipo el programa completo y los
                  contenidos de esta capacitación antes de inscribirte.
                </p>
              )}
            </section>
            <section aria-labelledby="course-audience-title">
              <h2 id="course-audience-title">A quién está dirigido</h2>
              {audience?.paragraphs?.length ? (
                audience.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))
              ) : (
                <p>
                  Consulta con nuestro equipo el perfil de ingreso y si esta
                  capacitación se ajusta a tus objetivos.
                </p>
              )}
            </section>
            {course.notice && <p className={styles.notice}>{course.notice}</p>}
          </div>
        </Container>
      </section>

      <section
        className={styles.enrollment}
        aria-labelledby="course-enrollment-title"
      >
        <Container>
          <h2 id="course-enrollment-title">Cómo inscribirte</h2>
          <ol className={styles.steps}>
            <li>
              <strong>Consulta la convocatoria</strong>
              <p>Escríbenos con el nombre del curso que te interesa.</p>
            </li>
            <li>
              <strong>Confirma las condiciones</strong>
              <p>
                Revisa fechas, requisitos, valor y qué incluye la capacitación.
              </p>
            </li>
            <li>
              <strong>Coordina tu inscripción</strong>
              <p>
                Nuestro equipo te indicará los pasos y documentos necesarios.
              </p>
            </li>
          </ol>
          <div className={styles.accordions}>
            {enrollment.map((section) => (
              <details
                key={section.title}
                name="course-enrollment"
              >
                <summary>
                  {section.title}
                  <ChevronDown
                    size={19}
                    aria-hidden="true"
                  />
                </summary>
                <div className={styles.accordionBody}>
                  {section.paragraphs?.map((paragraph) => (
                    <p key={paragraph}>{withAddressLink(paragraph)}</p>
                  ))}
                  {section.items && (
                    <ul>
                      {section.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.notice && (
                    <p className={styles.notice}>{section.notice}</p>
                  )}
                </div>
              </details>
            ))}
          </div>
          <Link
            className={styles.back}
            href="/cursos"
          >
            <ArrowLeft
              size={17}
              aria-hidden="true"
            />
            Volver a todos los cursos
          </Link>
        </Container>
      </section>

      {/* CTA móvil: ocupa su propia franja y respeta el área segura del dispositivo. */}
      <div className={styles.mobileContact}>
        <a
          className={styles.whatsapp}
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle
            size={19}
            aria-hidden="true"
          />
          Consultar por WhatsApp
          <span className="sr-only">
            {" "}
            sobre {course.title} (abre una pestaña nueva)
          </span>
        </a>
      </div>
    </>
  );
}
