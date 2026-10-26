import Container from "@/components/ui/Container/Container";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import CoursesCarousel from "../CoursesCarousel/CoursesCarousel";
import { courses } from "../../data/courses";
import styles from "./Courses.module.css";

export default function Courses() {
  return (
    <section
      id="cursos"
      tabIndex={-1}
      className={styles.root}
      aria-labelledby="courses-title"
    >
      <Container>
        <SectionHeading
          eyebrow="EXPLORA TU PRÓXIMO PASO"
          title="Capacitación para seguir avanzando."
          id="courses-title"
        >
          <p>
            Conoce nuestras propuestas de formación y revisa el detalle del
            programa que te interesa.
          </p>
        </SectionHeading>
        <CoursesCarousel courses={courses} />
        <p className={styles.note}>
          Oferta y condiciones pendientes de validación.
        </p>
      </Container>
    </section>
  );
}
