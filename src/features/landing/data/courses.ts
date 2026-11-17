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

// Próximas fechas: agregar startDate/endDate solo al confirmar una nueva convocatoria.
// indexable=false mantiene las fichas en revisión fuera del sitemap y con noindex.
export const courses: Course[] = [
  {
    id: "guardias-os10",
    seo: {
      title: "Curso de guardia de seguridad en Santiago Centro",
      description:
        "Curso de formación de guardia de seguridad: 90 horas, modalidad online mixta y requisitos de inscripción. Atención en Santiago Centro. Consulta próximas fechas.",
      introduction:
        "Si buscas capacitación para trabajar como guardia de seguridad, revisa esta formación de 90 horas en modalidad online mixta. Kaibo Security atiende las consultas e inscripciones en Santiago Centro; confirma las actividades presenciales y su lugar de realización antes de inscribirte.",
    },
    slug: "curso-de-guardia-de-seguridad",
    indexable: true,
    title: "Curso de Formación de Guardia de Seguridad",
    category: "SEGURIDAD PRIVADA",
    description:
      "Formación para desempeñarte como guardia de seguridad privada.",
    detail: "Formación para desempeñarte como guardia de seguridad privada.",
    image: "/images/about/sala-capacitacion-provisional.webp",
    imageAlt: "Instructor y estudiantes adultos en una sala de capacitación.",
    modality: "Online mixta",
    duration: "12 días hábiles · 90 horas",
    schedule: "Lunes a viernes, de 08:30 a 17:30",
    price: 110000,
    requirements: [
      "Copia legible de la cédula de identidad vigente, por ambos lados.",
      "Residencia definitiva para personas extranjeras, según la información de inscripción entregada.",
    ],
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
    seo: {
      title: "Curso de conserje en Santiago Centro",
      description:
        "Formación de conserje de 60 horas en modalidad online mixta. Revisa valor, requisitos y próximas fechas con Kaibo Security. Atención en Santiago Centro.",
      introduction:
        "Conoce esta alternativa de capacitación para labores de conserjería, con 60 horas en modalidad online mixta. Nuestro equipo te orienta sobre el programa y la inscripción desde Santiago Centro. Consulta qué actividades requieren asistencia presencial y qué certificación corresponde al curso.",
    },
    slug: "curso-de-conserje",
    indexable: false,
    title: "Curso de Formación de Conserje",
    category: "CONSERJERÍA",
    description: "Formación para labores de conserjería.",
    detail: "Formación para labores de conserjería.",
    image: "/images/courses/conserje-provisional.webp",
    imageAlt: "Atención en la recepción de un edificio.",
    modality: "Online mixta",
    duration: "8 días hábiles · 60 horas",
    schedule: "Lunes a viernes, de 08:30 a 17:30",
    price: 100000,
    requirements: [
      "Copia legible de la cédula de identidad vigente, por ambos lados.",
      "Residencia definitiva para personas extranjeras, según la información de inscripción entregada.",
    ],
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
    seo: {
      title: "Curso de CCTV en Santiago: cámaras y videovigilancia",
      description:
        "Curso de CCTV por $70.000 CLP: instalación de cámaras, configuración de DVR/NVR y mantenimiento. Atención en Santiago Centro. Consulta modalidad y próximas fechas.",
      introduction:
        "Si buscas un curso de CCTV en Santiago, puedes consultar a Kaibo Security sobre esta formación en sistemas de videovigilancia. El programa aborda instalación, configuración y mantenimiento de cámaras y DVR/NVR. Nuestro punto de atención está en Santiago Centro; confirma modalidad, lugar de clases y próximas fechas con el equipo.",
    },
    slug: "curso-de-cctv",
    indexable: false,
    title: "Curso de CCTV",
    category: "VIDEOVIGILANCIA",
    description:
      "Aprende a instalar, configurar y mantener sistemas de videovigilancia CCTV.",
    detail:
      "Formación teórica y práctica para instalar, configurar y mantener sistemas de videovigilancia CCTV desde cero, aplicando buenas prácticas y estándares de seguridad.",
    image: "/images/courses/cctv-provisional.webp",
    imageAlt: "Sala de monitoreo con pantallas de videovigilancia.",
    // Contenidos del afiche CCTV entregado por el cliente.
    price: 70000,
    // Sin fecha disponible. Pendientes: duración, modalidad, requisitos y certificado.
    sections: [
      {
        title: "¿Qué aprenderás?",
        items: [
          "Fundamentos de sistemas CCTV y su funcionamiento.",
          "Instalación y configuración de cámaras y DVR/NVR.",
          "Mantenimiento preventivo y correctivo.",
          "Buenas prácticas y seguridad en el equipo.",
        ],
      },
      {
        title: "¿A quién está dirigido?",
        paragraphs: [
          "El curso está orientado a personas de todos los niveles que buscan aprender sobre sistemas de videovigilancia, con un enfoque práctico y teórico desde cero.",
        ],
      },
      {
        title: "Información e inscripción",
        paragraphs: [
          "El valor del curso es $70.000 CLP. Aún no hay una fecha de inicio disponible. Consulta la duración, la modalidad y los requisitos de ingreso con nuestro equipo.",
          "Antes de inscribirte, confirma qué certificado se entrega y cuáles son las condiciones para obtenerlo.",
        ],
      },
    ],
  },
  {
    id: "baston-esposas",
    seo: {
      title: "Curso de bastón y esposas | Atención en Santiago Centro",
      description:
        "Capacitación presencial en bastón y esposas: jornada de 8 horas por $50.000 CLP. Atención en Santiago Centro. Consulta próximas fechas, requisitos y lugar del curso.",
      introduction:
        "Revisa esta jornada presencial de capacitación en bastón y esposas, con una duración informada de 8 horas. Puedes coordinar tu inscripción con el equipo de Kaibo Security en Santiago Centro. El horario y el lugar donde se realiza la capacitación deben confirmarse antes de asistir.",
    },
    slug: "curso-de-baston-y-esposas",
    indexable: true,
    title: "Curso de Bastón y Esposas",
    category: "CAPACITACIÓN ESPECÍFICA",
    description: "Jornada presencial de capacitación en bastón y esposas.",
    detail: "Jornada presencial de capacitación en bastón y esposas.",
    image: "/images/courses/baston-provisional.webp",
    imageAlt: "Implementos de entrenamiento sobre una mesa de capacitación.",
    modality: "Presencial",
    duration: "Una jornada intensiva · 8 horas",
    price: 50000,
    // PENDIENTE con el cliente: horario y lugar donde se realiza el curso.
    notice:
      "Pregunta por el horario y el lugar donde se realiza. La oficina es solo el punto de atención.",
    sections: [comoInscribirte],
  },
];
