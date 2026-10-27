import type { Course } from "../types/course.types";

/*
  Todo lo que está en comillas se muestra en la página. Las notas para ti o para
  el cliente van como comentarios (//) y no se publican.
  El valor de acreditación se informa aparte y no se suma al valor del curso.
*/

const comoInscribirte = {
  title: "Cómo inscribirte",
  paragraphs: [
    "Puedes pagar por transferencia bancaria o en efectivo, de forma presencial.",
    "Nuestra oficina está en Serrano 73, piso 9, oficina 910, Santiago Centro, a pasos del Metro Universidad de Chile. Las visitas se coordinan antes.",
  ],
};

export const courses: Course[] = [
  {
    id: "guardias-os10",
    title: "Curso de Formación de Guardia de Seguridad",
    category: "SEGURIDAD PRIVADA",
    description:
      "Formación para desempeñarte como guardia de seguridad privada.",
    detail: "Formación para desempeñarte como guardia de seguridad privada.",
    image: "/images/about/sala-capacitacion-provisional.webp",
    imageAlt: "Instructor y estudiantes adultos en una sala de capacitación.",
    modality: "Online mixta",
    duration: "12 días hábiles · 90 horas",
    startDate: "2026-11-09",
    endDate: "2026-11-24",
    schedule: "Lunes a viernes, de 08:30 a 17:30",
    price: 110000,
    modalityNote:
      "Pregunta qué actividades son online y cuáles requieren asistir en persona.",
    notice:
      "La acreditación tiene un cobro aparte de $40.000. Aprobar el curso no entrega la credencial automáticamente.",
    sections: [
      {
        ...comoInscribirte,
        paragraphs: [
          ...comoInscribirte.paragraphs,
          "Para ingresar a la nómina necesitas una copia legible de tu cédula de identidad vigente, por ambos lados. Si eres extranjero/a, se solicita residencia definitiva.",
        ],
      },
      {
        title: "Acreditación ante la SPD",
        paragraphs: [
          "Al terminar el curso y aprobar el examen, la acreditación se gestiona ante la Subsecretaría de Prevención del Delito (SPD). Antes de contratarla, consulta qué cubre el cobro de $40.000.",
          "Para el trámite se piden estos documentos:",
        ],
        items: [
          "Cédula de identidad vigente, por ambos lados.",
          "Residencia definitiva, si eres extranjero/a.",
          "ClaveÚnica habilitada (nunca compartas tu contraseña).",
          "Certificado médico e informe psicológico.",
          "Certificado de antecedentes para fines especiales, de máximo 30 días.",
          "Certificado de estudios de enseñanza media o equivalente (con apostilla y reconocimiento si estudiaste en el extranjero).",
          "Situación militar al día, si corresponde.",
        ],
        notice:
          "Los certificados médico y psicológico se incluyen solo si haces la gestión con Capacitaciones Desmar, y se usan únicamente para ese trámite.",
      },
    ],
  },
  {
    id: "conserje-os10",
    title: "Curso de Formación de Conserje",
    category: "CONSERJERÍA",
    description: "Formación para labores de conserjería.",
    detail: "Formación para labores de conserjería.",
    image: "/images/courses/conserje-provisional.webp",
    imageAlt: "Atención en la recepción de un edificio.",
    modality: "Online mixta",
    duration: "8 días hábiles · 60 horas",
    startDate: "2026-11-09",
    endDate: "2026-11-18",
    schedule: "Lunes a viernes, de 08:30 a 17:30",
    price: 100000,
    modalityNote:
      "Pregunta qué actividades son online y cuáles requieren asistir en persona.",
    // PENDIENTE con el cliente: el material habla de una acreditación de $40.000
    // pero se refiere a guardia de seguridad. Cuando confirme si aplica a conserje,
    // qué habilitación entrega y qué cubre el cobro, agregar la sección aquí.
    sections: [
      {
        ...comoInscribirte,
        paragraphs: [
          ...comoInscribirte.paragraphs,
          "Para ingresar a la nómina necesitas una copia legible de tu cédula de identidad vigente, por ambos lados. Si eres extranjero/a, se solicita residencia definitiva.",
        ],
      },
      {
        title: "¿Incluye acreditación?",
        paragraphs: [
          "Escríbenos por WhatsApp y te contamos si este curso incluye acreditación, qué documentos se piden y cuánto cuesta.",
        ],
      },
    ],
  },
  {
    id: "cctv",
    title: "Curso de CCTV",
    category: "VIDEOVIGILANCIA",
    description:
      "Acércate al monitoreo y la operación de sistemas de videovigilancia.",
    detail:
      "Para quienes quieren conocer el trabajo en una sala de monitoreo. Pregunta por el temario, las fechas y las condiciones vigentes.",
    image: "/images/courses/cctv-provisional.webp",
    imageAlt: "Sala de monitoreo con pantallas de videovigilancia.",
    // PENDIENTE con el cliente: duración, modalidad, fechas y valor.
  },
  {
    id: "baston-esposas",
    title: "Curso de Bastón y Esposas",
    category: "CAPACITACIÓN ESPECÍFICA",
    description: "Jornada presencial de capacitación en bastón y esposas.",
    detail: "Jornada presencial de capacitación en bastón y esposas.",
    image: "/images/courses/baston-provisional.webp",
    imageAlt: "Implementos de entrenamiento sobre una mesa de capacitación.",
    modality: "Presencial",
    duration: "Una jornada intensiva · 8 horas",
    startDate: "2026-11-09",
    price: 50000,
    // PENDIENTE con el cliente: horario y lugar donde se realiza el curso.
    notice:
      "Pregunta por el horario y el lugar donde se realiza. La oficina es solo el punto de atención.",
    sections: [comoInscribirte],
  },
];