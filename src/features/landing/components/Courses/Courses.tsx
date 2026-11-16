import Link from "next/link";
import Container from "@/components/ui/Container/Container";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import CoursesGrid from "../CoursesGrid/CoursesGrid";
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
          title="Elige tu curso."
          id="courses-title"
        >
          <p>
            Conoce nuestras capacitaciones y consulta el programa de cada curso.
          </p>
        </SectionHeading>
        <CoursesGrid courses={courses} />
        <Link
          className={styles.catalogLink}
          href="/cursos"
        >
          Comparar cursos →
        </Link>
      </Container>
    </section>
  );
}
