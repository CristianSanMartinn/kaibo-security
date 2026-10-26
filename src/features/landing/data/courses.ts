import type { Course } from "../types/course.types";

// CATÁLOGO: edita aquí los cursos sin cambiar sus componentes.
// Nombres recuperados del sitio anterior; validar oferta y textos antes de publicar.
// No rellenar duration, modality, price, contents o requirements con estimaciones.
export const courses: Course[] = [
  {
    id: "guardias-os10",
    title: "Curso OS10 – Guardias de Seguridad",
    category: "SEGURIDAD PRIVADA",
    description:
      "Formación orientada al desempeño de funciones de guardia de seguridad privada.",
    detail:
      "Una propuesta de capacitación para personas que desean acercarse al trabajo de guardia de seguridad privada y comprender la importancia de la observación, la comunicación y una actuación responsable en su entorno laboral. Elegir una formación comienza por conocer su alcance y comprobar que responde a tus objetivos. Antes de inscribirte, solicita el programa vigente y consulta qué conocimientos previos, documentos y condiciones de participación se requieren. También puedes preguntar por la modalidad, los horarios, las fechas disponibles y el proceso de evaluación. El equipo de Kaibo Security puede orientarte sobre la información del curso y los pasos para realizar tu consulta.",
    image: "/images/about/sala-capacitacion-provisional.webp",
    imageAlt:
      "Imagen ilustrativa de un instructor y estudiantes adultos en capacitación.",
  },
  {
    id: "conserje-os10",
    title: "Curso Conserje OS10",
    category: "CONSERJERÍA",
    description:
      "Conocimientos orientados a la conserjería y la atención de accesos en edificios.",
    detail:
      "Una alternativa para personas interesadas en la conserjería, la atención de residentes y visitantes y la organización cotidiana de los accesos en edificios y comunidades. La comunicación clara, el trato respetuoso y la atención a las situaciones del entorno son aspectos importantes para quienes desean desarrollarse en esta área. Consulta a Kaibo Security el alcance específico de la capacitación y cómo se relaciona con las funciones que te interesa desempeñar. Antes de tomar una decisión, revisa el temario, los requisitos de ingreso, la modalidad y los horarios disponibles. Solicita también información sobre las condiciones de inscripción y cualquier documentación asociada al programa.",
    image: "/images/courses/conserje-provisional.webp",
    imageAlt: "Imagen ilustrativa de atención en la recepción de un edificio.",
  },
  {
    id: "cctv",
    title: "Curso de CCTV",
    category: "VIDEOVIGILANCIA",
    description:
      "Acércate al monitoreo y la operación de sistemas de videovigilancia.",
    detail:
      "Una propuesta para quienes buscan acercarse al entorno de la videovigilancia y conocer mejor el trabajo que se realiza desde una sala de monitoreo, donde la atención y la comunicación tienen un papel importante. Si te interesa esta área, conocer el enfoque de la capacitación te ayudará a evaluar si se ajusta a tus objetivos personales o a las necesidades de tu equipo. Pregunta por el temario vigente, las herramientas que se utilizan y si el programa contempla actividades prácticas. Revisa además los conocimientos previos necesarios, la modalidad, las fechas y los horarios. Kaibo Security puede informarte sobre la disponibilidad y las condiciones del curso.",
    image: "/images/courses/cctv-provisional.webp",
    imageAlt:
      "Imagen ilustrativa de una sala de monitoreo con pantallas de videovigilancia.",
  },
  {
    id: "baston-esposas",
    title: "Curso de Bastón y Esposas",
    category: "CAPACITACIÓN ESPECÍFICA",
    description:
      "Formación sobre implementos de seguridad y su uso responsable en el ámbito profesional.",
    detail:
      "Una capacitación específica para personas interesadas en conocer el enfoque profesional y responsable asociado a los implementos de seguridad, considerando la importancia de la preparación y de comprender el alcance de cada función. Antes de inscribirte, conversa con Kaibo Security sobre tus objetivos y consulta a quién está dirigido el programa. Solicita información sobre los contenidos, los requisitos de participación y el tipo de actividades contempladas. Pregunta también por la modalidad, los horarios, los materiales y las condiciones de inscripción. Revisa con la empresa qué contempla la capacitación y qué documentación se entrega, para decidir con información clara antes de participar.",
    image: "/images/courses/baston-provisional.webp",
    imageAlt:
      "Imagen ilustrativa de implementos de entrenamiento sobre una mesa de capacitación.",
  },
];
