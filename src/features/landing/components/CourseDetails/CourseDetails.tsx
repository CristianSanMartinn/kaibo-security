"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton/WhatsAppButton";
import type { Course } from "../../types/course.types";
import styles from "./CourseDetails.module.css";

type Props = { course: Course | null; onClose: () => void };

const parse = (value: string) => new Date(value + "T12:00:00Z");
const fmt = (options: Intl.DateTimeFormatOptions, date: Date) =>
  new Intl.DateTimeFormat("es-CL", { ...options, timeZone: "UTC" }).format(
    date,
  );

function formatDates(start: string, end?: string) {
  const from = parse(start);
  if (!end)
    return fmt({ day: "numeric", month: "long", year: "numeric" }, from);
  const to = parse(end);
  const sameYear = from.getUTCFullYear() === to.getUTCFullYear();
  const sameMonth = sameYear && from.getUTCMonth() === to.getUTCMonth();
  const first = fmt(
    {
      day: "numeric",
      ...(!sameMonth ? { month: "long" } : {}),
      ...(!sameYear ? { year: "numeric" } : {}),
    },
    from,
  );
  return (
    first + " al " + fmt({ day: "numeric", month: "long", year: "numeric" }, to)
  );
}

export default function CourseDetails({ course, onClose }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const scrollBody = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (!course) {
      if (element.open) element.close();
      return;
    }
    // El diálogo nativo contiene el foco y permite Escape sin una trampa manual.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!element.open) element.showModal();
    if (scrollBody.current) scrollBody.current.scrollTop = 0;
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [course]);

  return (
    <dialog
      id="course-dialog"
      ref={dialog}
      className={styles.dialog}
      aria-labelledby="course-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          event.currentTarget.close();
      }}
    >
      {course && (
        <>
          <header className={styles.header}>
            <h3 id="course-dialog-title">{course.title}</h3>
            <button
              type="button"
              className={styles.close}
              aria-label="Cerrar detalle del curso"
              onClick={() => dialog.current?.close()}
              autoFocus
            >
              <X
                size={22}
                aria-hidden="true"
              />
            </button>
          </header>
          {/* Solo esta zona hace scroll: encabezado y precio permanecen visibles. */}
          <div
            ref={scrollBody}
            className={styles.scrollBody}
          >
            <figure className={styles.image}>
              <Image
                src={course.image}
                alt={course.imageAlt}
                width={960}
                height={480}
                sizes="(min-width: 50rem) 768px, 100vw"
              />
            </figure>
            <div className={styles.content}>
              <p className={styles.lead}>{course.description}</p>
              {course.detail && course.detail !== course.description && (
                <p className={styles.description}>{course.detail}</p>
              )}
              {(course.duration ||
                course.modality ||
                course.startDate ||
                course.schedule) && (
                <dl className={styles.facts}>
                  {course.duration && (
                    <div>
                      <dt>Duración</dt>
                      <dd>{course.duration}</dd>
                    </div>
                  )}
                  {course.modality && (
                    <div>
                      <dt>Modalidad</dt>
                      <dd>{course.modality}</dd>
                    </div>
                  )}
                  {course.startDate && (
                    <div>
                      <dt>{course.endDate ? "Fechas" : "Fecha"}</dt>
                      <dd>{formatDates(course.startDate, course.endDate)}</dd>
                    </div>
                  )}
                  {course.schedule && (
                    <div>
                      <dt>Horario</dt>
                      <dd>{course.schedule}</dd>
                    </div>
                  )}
                </dl>
              )}
              {course.modalityNote && (
                <p className={styles.description}>{course.modalityNote}</p>
              )}
              {course.notice && (
                <p className={styles.notice}>{course.notice}</p>
              )}
              {course.sections?.length ? (
                <div className={styles.sections}>
                  {course.sections.map((section) => (
                    <details
                      key={section.title}
                      className={styles.section}
                      name={"conditions-" + course.id}
                    >
                      <summary>{section.title}</summary>
                      <div className={styles.sectionBody}>
                        {section.paragraphs?.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        {section.items?.length ? (
                          <ul>
                            {section.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : null}
                        {section.notice && (
                          <p className={styles.sectionNotice}>
                            {section.notice}
                          </p>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <footer className={styles.footer}>
            <p className={styles.price}>
              {course.price !== undefined ? (
                <>
                  <strong>
                    {new Intl.NumberFormat("es-CL", {
                      style: "currency",
                      currency: "CLP",
                      maximumFractionDigits: 0,
                    }).format(course.price)}
                  </strong>
                  <span>CLP · Valor del curso</span>
                </>
              ) : (
                <span>Consulta el valor y las fechas por WhatsApp</span>
              )}
            </p>
            <WhatsAppButton
              label="Consultar por este curso"
              className={styles.whatsapp}
              message={
                "Hola, quiero consultar por " +
                course.title +
                ". ¿Me pueden orientar para inscribirme?"
              }
            />
          </footer>
        </>
      )}
    </dialog>
  );
}
