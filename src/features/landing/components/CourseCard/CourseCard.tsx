import Image from "next/image";
import { ArrowUpRight, Clock3, Monitor } from "lucide-react";
import type { Course } from "../../types/course.types";
import styles from "./CourseCard.module.css";

type Props = {
  course: Course;
  position: number;
  selected: boolean;
  preview?: boolean;
  detailsId: string;
  onSelect: (course: Course, trigger: HTMLButtonElement) => void;
};

export default function CourseCard({
  course,
  position,
  selected,
  preview = false,
  detailsId,
  onSelect,
}: Props) {
  return (
    <article
      className={styles.root}
      data-selected={selected}
      data-preview={preview}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("button, a")) return;
        const trigger = event.currentTarget.querySelector<HTMLButtonElement>(
          "[data-course-action]",
        );
        if (trigger) onSelect(course, trigger);
      }}
    >
      {/* Cabecera numerada e imagen interior, siguiendo la referencia visual. */}
      <div className={styles.topline}>
        <span className={styles.number}>
          {String(position).padStart(2, "0")}
        </span>
        <p className={styles.category}>{course.category}</p>
      </div>
      <div className={styles.image}>
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 46vw, 86vw"
          loading="lazy"
          unoptimized
        />
      </div>
      <div className={styles.body}>
        <h3>{course.title}</h3>
        <p
          data-course-description
          className={styles.description}
        >
          {course.description}
        </p>
        <div
          data-course-facts
          className={styles.facts}
        >
          {course.duration && (
            <span>
              <Clock3
                size={14}
                aria-hidden="true"
              />
              {course.duration}
            </span>
          )}
          {course.modality && (
            <span>
              <Monitor
                size={14}
                aria-hidden="true"
              />
              {course.modality}
            </span>
          )}
        </div>
        <div className={styles.bottom}>
          {/* No se inventa un precio: el dato es opcional y admite incluso un valor cero. */}
          <p className={styles.price}>
            {course.price !== undefined
              ? new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                  maximumFractionDigits: 0,
                }).format(course.price)
              : "Consultar valor"}
          </p>
          <button
            type="button"
            className={styles.action}
            data-course-action
            aria-expanded={selected}
            aria-controls={detailsId}
            onClick={(event) => onSelect(course, event.currentTarget)}
          >
            Más información
            <ArrowUpRight aria-hidden="true" />
            <span className="sr-only"> sobre {course.title}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
