import CourseCard from "../CourseCard/CourseCard";
import type { Course } from "../../types/course.types";
import styles from "./CoursesGrid.module.css";

export default function CoursesGrid({ courses }: { courses: Course[] }) {
  return (
    <ul
      className={styles.grid}
      aria-label="Cursos disponibles"
    >
      {courses.map((course) => (
        <li key={course.id}>
          <CourseCard course={course} />
        </li>
      ))}
    </ul>
  );
}
