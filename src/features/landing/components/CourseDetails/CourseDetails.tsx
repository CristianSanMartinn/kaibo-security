import Image from "next/image";
import { X } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton/WhatsAppButton";
import type { Course } from "../../types/course.types";
import styles from "./CourseDetails.module.css";

type Props = {
  course: Course;
  id: string;
  onClose: () => void;
  withImage?: boolean;
};

export default function CourseDetails({
  course,
  id,
  onClose,
  withImage = false,
}: Props) {
  const sentences = course.detail.split(/(?<=[.!?])\s+/);
  const introduction = withImage ? sentences[0] : course.detail;
  const continuation = withImage ? sentences.slice(1).join(" ") : "";

  return (
    <section
      id={id}
      tabIndex={-1}
      className={styles.root}
      aria-labelledby={id + "-title"}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          onClose();
        }
      }}
    >
      {/* Float permite que el texto siga al lado y continúe debajo de la imagen. */}
      {withImage && (
        <figure className={styles.image}>
          <Image
            src={course.image}
            alt={course.imageAlt}
            width={600}
            height={450}
            sizes="(min-width: 48rem) 25vw, 85vw"
            unoptimized
          />
        </figure>
      )}
      <div className={styles.heading}>
        <div>
          <p>INFORMACIÓN DEL PROGRAMA</p>
          <h3 id={id + "-title"}>{course.title}</h3>
        </div>
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Cerrar detalle del curso"
        >
          <X
            size={20}
            aria-hidden="true"
          />
        </button>
      </div>
      <p className={styles.description}>{introduction}</p>
      {continuation && <p className={styles.continuation}>{continuation}</p>}
      {/* Renderizado condicional: solo mostrar información confirmada en courses.ts. */}
      {(course.duration || course.modality || course.price !== undefined) && (
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
          {course.price !== undefined && (
            <div>
              <dt>Valor</dt>
              <dd>
                {new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                  maximumFractionDigits: 0,
                }).format(course.price)}
              </dd>
            </div>
          )}
        </dl>
      )}
      <div className={styles.lists}>
        {course.contents?.length ? (
          <div>
            <h4>Contenidos</h4>
            <ul>
              {course.contents.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {course.requirements?.length ? (
          <div>
            <h4>Requisitos</h4>
            <ul>
              {course.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
      <div className={styles.action}>
        <WhatsAppButton
          label="Consultar por este curso"
          message={
            "Hola, quiero información sobre " +
            course.title +
            ". ¿Me pueden indicar requisitos, fechas y valor?"
          }
        />
        <p>
          Consulta valores, fechas, modalidad y requisitos vigentes antes de
          inscribirte.
        </p>
      </div>
    </section>
  );
}
