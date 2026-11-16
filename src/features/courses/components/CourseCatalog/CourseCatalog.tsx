import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Circle,
  CreditCard,
  MapPin,
  FileText,
  ChevronDown,
} from "lucide-react";
import Container from "@/components/ui/Container/Container";
import { siteConfig } from "@/config/site";
import { courses } from "@/features/landing/data/courses";
import { coursePath, formatPrice } from "../../lib/course-pages";
import styles from "./CourseCatalog.module.css";

const questions = [
  {
    title: "¿Cómo confirmo las próximas fechas?",
    text: "Consulta a nuestro equipo por el curso que te interesa. Te indicaremos la convocatoria disponible y las condiciones de inscripción antes de realizar un pago.",
  },
  {
    title: "¿Qué significa modalidad online mixta?",
    text: "La capacitación combina actividades online y actividades que pueden requerir asistencia presencial. Confirma con el equipo cuáles corresponden al curso que eliges.",
  },
  {
    title: "¿La acreditación está incluida en el valor?",
    text: "No asumas que está incluida. Revisa la ficha del curso y consulta qué servicios contempla el valor publicado, qué cobros son adicionales y qué acreditación corresponde.",
  },
];

export default function CourseCatalog() {
  return (
    <>
      <header className={styles.intro}>
        <Container>
          <nav
            className={styles.breadcrumb}
            aria-label="Migas de pan"
          >
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Cursos</span>
          </nav>
          <h1>Cursos de seguridad privada en Santiago.</h1>
          <p>
            Compara cursos de guardia de seguridad, conserje, CCTV y bastón y
            esposas. Te orientamos sobre programas e inscripción desde nuestra
            oficina en Santiago Centro, a pasos del Metro Universidad de Chile.
          </p>
          <a
            className={styles.introLink}
            href="#comparacion"
          >
            Comparar cursos{" "}
            <ArrowUpRight
              size={17}
              aria-hidden="true"
            />
          </a>
        </Container>
      </header>

      <section
        id="comparacion"
        className={styles.catalog}
        aria-labelledby="comparison-title"
      >
        <Container>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>NUESTRAS CAPACITACIONES</p>
              <h2 id="comparison-title">Lo esencial, de un vistazo.</h2>
            </div>
            <p>
              Elige un curso para conocer sus contenidos y requisitos de
              ingreso.
            </p>
          </div>

          {/* Tarjetas originales: un curso por tarjeta, con enlaces directos a su ficha. */}
          <ul className={styles.grid}>
            {courses.map((course) => {
              const facts = [
                { label: "Duración", value: course.duration },
                { label: "Modalidad", value: course.modality },
                { label: "Horario", value: course.schedule },
              ];

              return (
                <li
                  key={course.id}
                  className={styles.card}
                >
                  <p className={styles.category}>{course.category}</p>
                  <h2>{course.title}</h2>
                  <p className={styles.description}>{course.description}</p>
                  <p className={styles.price}>
                    <strong data-consult={course.price === undefined}>
                      {formatPrice(course.price)}
                    </strong>
                    {course.price !== undefined && <span>CLP</span>}
                  </p>
                  <ul className={styles.facts}>
                    {facts.map((fact) => (
                      <li
                        key={fact.label}
                        data-pending={!fact.value}
                      >
                        {fact.value ? (
                          <Check
                            size={17}
                            aria-hidden="true"
                          />
                        ) : (
                          <Circle
                            size={15}
                            aria-hidden="true"
                          />
                        )}
                        <span>
                          {fact.value && (
                            <span className="sr-only">{fact.label}: </span>
                          )}
                          {fact.value || fact.label + ": consultar"}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    className={styles.action}
                    href={coursePath(course)}
                    aria-label={"Ver curso: " + course.title}
                  >
                    Ver curso
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className={styles.comparisonNote}>
            Valores expresados en pesos chilenos. Confirma la convocatoria,
            disponibilidad y servicios incluidos antes de realizar un pago.
          </p>
        </Container>
      </section>

      <section
        className={styles.enrollment}
        aria-labelledby="catalog-enrollment-title"
      >
        <Container>
          <p className={styles.eyebrow}>EL SIGUIENTE PASO</p>
          <h2 id="catalog-enrollment-title">Cómo coordinar tu inscripción.</h2>
          <div className={styles.infoGrid}>
            <article>
              <CreditCard
                size={23}
                aria-hidden="true"
              />
              <h3>Formas de pago</h3>
              <p>
                Guardia, Conserje y Bastón y Esposas cuentan con pago por
                transferencia o efectivo presencial. Consulta las condiciones
                del curso de CCTV.
              </p>
            </article>
            <article>
              <MapPin
                size={23}
                aria-hidden="true"
              />
              <h3>Atención presencial</h3>
              <p>
                <a
                  className={styles.addressLink}
                  href={
                    "https://www.google.com/maps/search/?api=1&query=" +
                    encodeURIComponent(siteConfig.address + ", Chile")
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteConfig.address}
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                  />
                  <span className="sr-only">
                    {" "}
                    (abre Google Maps en una pestaña nueva)
                  </span>
                </a>
                . A pasos del Metro Universidad de Chile. Coordina previamente
                tu visita; la oficina no confirma el lugar de realización de
                cada curso.
              </p>
            </article>
            <article>
              <FileText
                size={23}
                aria-hidden="true"
              />
              <h3>Documentos de ingreso</h3>
              <p>
                Para Guardia y Conserje se solicita una copia legible de la
                cédula vigente por ambos lados. Revisa en cada ficha los demás
                antecedentes que correspondan.
              </p>
            </article>
          </div>
          <Link
            className={styles.textLink}
            href="/#contacto"
          >
            Consultar mi inscripción{" "}
            <ArrowUpRight
              size={18}
              aria-hidden="true"
            />
          </Link>
        </Container>
      </section>

      <section
        className={styles.companies}
        aria-labelledby="course-companies-title"
      >
        <Container className={styles.companiesInner}>
          <div>
            <p className={styles.eyebrow}>PARA ORGANIZACIONES</p>
            <h2 id="course-companies-title">¿Buscas capacitar a tu equipo?</h2>
            <p>Conversemos sobre las necesidades de formación de tu empresa.</p>
          </div>
          <Link
            className={styles.outlineAction}
            href="/#empresas"
          >
            Capacitación para empresas{" "}
            <ArrowUpRight
              size={18}
              aria-hidden="true"
            />
          </Link>
        </Container>
      </section>

      <section
        className={styles.faq}
        aria-labelledby="catalog-faq-title"
      >
        <Container className={styles.faqLayout}>
          <div>
            <p className={styles.eyebrow}>ANTES DE INSCRIBIRTE</p>
            <h2 id="catalog-faq-title">Resuelve tus dudas.</h2>
            <p>
              Si necesitas orientación para elegir, nuestro equipo puede
              ayudarte.
            </p>
            <Link
              className={styles.textLink}
              href="/#contacto"
            >
              Ir al formulario de contacto{" "}
              <ArrowUpRight
                size={18}
                aria-hidden="true"
              />
            </Link>
          </div>
          <div className={styles.questions}>
            {questions.map((question) => (
              <details
                key={question.title}
                name="catalog-questions"
              >
                <summary>
                  {question.title}
                  <ChevronDown
                    size={19}
                    aria-hidden="true"
                  />
                </summary>
                <p>{question.text}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
