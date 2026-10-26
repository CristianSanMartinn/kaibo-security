"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowLeftRight, ArrowLeft, ArrowRight } from "lucide-react";
import CourseCard from "../CourseCard/CourseCard";
import CourseDetails from "../CourseDetails/CourseDetails";
import type { Course } from "../../types/course.types";
import styles from "./CoursesCarousel.module.css";

export default function CoursesCarousel({ courses }: { courses: Course[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const row = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState(1);
  const [phase, setPhase] = useState("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const changing = useRef(false);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const selectedIndex = courses.findIndex((course) => course.id === selectedId);
  const selected = courses[selectedIndex];

  function select(course: Course) {
    if (selectedId) {
      const nextIndex = courses.findIndex((item) => item.id === course.id);
      if (nextIndex !== selectedIndex)
        changeCourse(nextIndex, nextIndex > selectedIndex ? 1 : -1);
      return;
    }
    setSelectedId(course.id);
    requestAnimationFrame(() => {
      const panel = document.getElementById("course-detail-panel");
      panel?.focus({ preventScroll: true });
      panel?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "auto",
      });
    });
  }

  // Primero sale el contenido y después entra el siguiente en la misma dirección.
  function changeCourse(index: number, step: number) {
    if (changing.current || index < 0 || index >= courses.length) return;
    changing.current = true;
    setDirection(step);
    setPhase("exit");
    timer.current = setTimeout(() => {
      setSelectedId(courses[index].id);
      setPhase("enter");
      timer.current = setTimeout(() => {
        setPhase("idle");
        changing.current = false;
      }, 420);
    }, 220);
  }

  function move(step: number) {
    if (!courses.length) return;
    changeCourse(selectedIndex + step, step);
  }

  function close() {
    if (timer.current) clearTimeout(timer.current);
    changing.current = false;
    setPhase("idle");
    const previousId = selectedId;
    setSelectedId(null);
    requestAnimationFrame(() => {
      row.current
        ?.querySelector<HTMLButtonElement>(
          '[data-course-id="' + previousId + '"] [data-course-action]',
        )
        ?.focus({ preventScroll: true });
    });
  }

  return (
    <div
      className={styles.root}
      data-course-motion="enabled"
    >
      <p className={styles.hint}>
        <ArrowLeftRight
          size={17}
          aria-hidden="true"
        />
        Elige una tarjeta para explorar el curso.
      </p>
      {/* La fila permanece fija; solo el detalle se cierra y se abre al cambiar. */}
      <div
        id="courses-track"
        ref={row}
        className={styles.track}
        data-expanded={Boolean(selected)}
        style={{ "--count": courses.length } as CSSProperties}
        role="region"
        aria-label="Cursos: selecciona una tarjeta para ver su información"
      >
        {courses.map((course, index) => {
          return (
            <div
              key={course.id}
              className={styles.item}
              data-course-id={course.id}
              data-selected={course.id === selectedId}
              inert={course.id === selectedId}
              style={
                {
                  "--index": index,
                  zIndex: 1,
                } as CSSProperties
              }
            >
              <CourseCard
                course={course}
                position={index + 1}
                selected={course.id === selectedId}
                detailsId="course-details"
                onSelect={select}
              />
            </div>
          );
        })}
        <div
          id="course-details"
          hidden={!selected}
          className={styles.expanded}
          data-phase={phase}
          style={{ "--direction": direction } as CSSProperties}
        >
          {selected && (
            <>
              <nav
                className={styles.courseNavigation}
                aria-label="Navegar entre cursos"
              >
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-disabled={phase !== "idle" || selectedIndex === 0}
                  aria-label="Ver curso anterior"
                >
                  <ArrowLeft
                    size={18}
                    aria-hidden="true"
                  />
                </button>
                <span
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className="sr-only">
                    {selected.title}. Curso {selectedIndex + 1} de{" "}
                    {courses.length}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-disabled={phase !== "idle"}
                  aria-label="Ver curso siguiente"
                >
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                  />
                </button>
              </nav>
              <div
                key={selected.id}
                className={styles.courseTransition}
                data-phase={phase}
                style={{ "--direction": direction } as CSSProperties}
              >
                <CourseDetails
                  course={selected}
                  id="course-detail-panel"
                  withImage
                  onClose={close}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
