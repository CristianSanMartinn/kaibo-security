import Image from "next/image";
import { ArrowRight, Clock3, Monitor } from "lucide-react";
import type { Course } from "../../types/course.types";
import styles from "./CourseCard.module.css";

type Props = {
  course: Course;
  onSelect: (course: Course, trigger: HTMLButtonElement) => void;
};

export default function CourseCard({ course, onSelect }: Props) {
  return (
    <article className={styles.root}>
      <div className={styles.image}>
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          sizes="(min-width: 80rem) 290px, (min-width: 64rem) 23vw, (min-width: 40rem) 46vw, 92vw"
          loading="lazy"
        />
      </div>
      <div className={styles.body}>
        <p className={styles.category}>{course.category}</p>
        <h3>{course.title}</h3>
        <p className={styles.description}>{course.description}</p>
        {(course.duration || course.modality) && (
          <div className={styles.facts}>
            {course.duration && (
              <span>
                <Clock3
                  size={16}
                  aria-hidden="true"
                />
                {course.duration}
              </span>
            )}
            {course.modality && (
              <span>
                <Monitor
                  size={16}
                  aria-hidden="true"
                />
                {course.modality}
              </span>
            )}
          </div>
        )}
        <div className={styles.bottom}>
          <p className={styles.price}>
            {course.price !== undefined
              ? new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                  maximumFractionDigits: 0,
                }).format(course.price)
              : "Consultar valor"}
            {course.price !== undefined && <small>CLP</small>}
          </p>
          <span
            className={styles.action}
            aria-hidden="true"
          >
            Ver detalle <ArrowRight size={18} />
          </span>
        </div>
      </div>
      {/* Un único botón cubre la tarjeta completa y funciona también con teclado. */}
      <button
        type="button"
        className={styles.trigger}
        aria-label={"Ver detalle de " + course.title}
        aria-haspopup="dialog"
        aria-controls="course-dialog"
        onClick={(event) => onSelect(course, event.currentTarget)}
      />
    </article>
  );
}
