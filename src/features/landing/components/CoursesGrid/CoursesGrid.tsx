"use client";

import { useRef, useState } from "react";
import CourseCard from "../CourseCard/CourseCard";
import CourseDetails from "../CourseDetails/CourseDetails";
import type { Course } from "../../types/course.types";
import styles from "./CoursesGrid.module.css";

export default function CoursesGrid({ courses }: { courses: Course[] }) {
  const [selected, setSelected] = useState<Course | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  function open(course: Course, trigger: HTMLButtonElement) {
    opener.current = trigger;
    setSelected(course);
  }

  function close() {
    setSelected(null);
    requestAnimationFrame(() => opener.current?.focus({ preventScroll: true }));
  }

  return (
    <>
      <ul
        className={styles.grid}
        aria-label="Cursos disponibles"
      >
        {courses.map((course) => (
          <li key={course.id}>
            <CourseCard
              course={course}
              onSelect={open}
            />
          </li>
        ))}
      </ul>
      <CourseDetails
        course={selected}
        onClose={close}
      />
    </>
  );
}
