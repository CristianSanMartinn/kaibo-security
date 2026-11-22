import type { Course } from "../types/course.types";

/**
 * Contenido público de los cursos.
 *
 * Publicar únicamente información confirmada por Kaibo Security.
 * No agregar certificaciones, fechas o requisitos sin validación.
 *
 * indexable:
 * - true: permite que la ficha se incluya en el sitemap.
 * - false: mantiene la ficha fuera del sitemap y, según el generador
 *   de metadatos, indica noindex.
 *
 * La acreditación se informa por separado del precio del curso.
 */

const comoInscribirte = {
  title: "Cómo inscribirte",
  paragraphs: [
    "Puedes pagar por transferencia bancaria o en efectivo, de forma presencial.",
    "Nuestra oficina está en Serrano 73, piso 9, oficina 910, Santiago Centro, a pasos del Metro Universidad de Chile. Las visitas se coordinan previamente.",
  ],
};

export const courses: Course[] = [
  {
    id: "guardias-os10",

    seo: {
      title:
        "Curso OS10 para guardias de seguridad en Santiago",

      description:
        "Consulta el curso OS10 para guardias de seguridad: valor, formación de 90 horas, modalidad mixta y requisitos. Atención en Santiago Centro.",

      introduction:
        "Conoce el curso OS10 para guardias de seguridad y revisa su valor, duración, requisitos y modalidad online mixta. Kaibo Security atiende consultas e inscripciones en Santiago Centro. Antes de inscribirte, confirma las próximas fechas, las actividades presenciales y su lugar de realización.",
    },

    // Mantener la URL existente para evitar cambios innecesarios.
    slug: "curso-de-guardia-de-seguridad",

    indexable: true,

    title: "Curso OS10 de Formación de Guardia de Seguridad",

    category: "SEGURIDAD PRIVADA",

    description:
      "Formación para guardias de seguridad privada. Revisa el programa, los requisitos y la modalidad del curso OS10.",

    detail:
      "Consulta la formación para desempeñarte como guardia de seguridad privada, sus requisitos de inscripción y las condiciones del proceso de acreditación.",

    image: "/images/about/sala-capacitacion-provisional.webp",

    imageAlt:
      "Instructor y estudiantes adultos en una sala de capacitación.",

    modality: "Online mixta",

    duration: "12 días hábiles · 90 horas",

    schedule: "Lunes a viernes, de 08:30 a 17:30",

    price: 110000,

    requirements: [
      "Copia legible de la cédula de identidad vigente, por ambos lados.",
      "Residencia definitiva para personas extranjeras, según la información de inscripción entregada.",
    ],

    modalityNote:
      "Consulta qué actividades se realizan online y cuáles requieren asistencia presencial.",

    notice:
      "La acreditación tiene un cobro aparte de $40.000. Aprobar el curso no entrega la credencial automáticamente.",

    sections: [
      {
        title: "Duración y modalidad del curso OS10",

        paragraphs: [
          "La formación tiene una duración informada de 90 horas, distribuidas en 12 días hábiles, en modalidad online mixta.",
          "El horario informado es de lunes a viernes, de 08:30 a 17:30. Consulta las próximas fechas y confirma qué actividades requieren asistencia presencial.",
        ],
      },

      {
        title: "Valor del curso e inscripción",

        paragraphs: [
          "El valor informado del curso es de $110.000 CLP. El cobro de acreditación se informa por separado.",
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
      title:
        "Curso de conserje en Santiago: formación y requisitos",

      description:
        "Curso de conserje de 60 horas en modalidad online mixta. Consulta valor, requisitos y próximas fechas con atención en Santiago Centro.",

      introduction:
        "Conoce el curso de formación de conserje de Kaibo Security. Revisa su valor, duración de 60 horas y modalidad online mixta. Nuestro equipo atiende consultas e inscripciones en Santiago Centro. Antes de inscribirte, confirma las actividades presenciales, el lugar de realización y qué certificación corresponde al curso.",
    },

    slug: "curso-de-conserje",

    // Mantener en revisión hasta aclarar la certificación y acreditación.
    // Cambiar a true cuando el cliente apruebe el contenido definitivo.
    indexable: false,

    title: "Curso de Formación de Conserje",

    category: "CONSERJERÍA",

    description:
      "Capacitación para labores de conserjería. Consulta duración, modalidad y requisitos de inscripción.",

    detail:
      "Formación para labores de conserjería, con información sobre duración, modalidad e inscripción.",

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
      "Consulta qué actividades se realizan online y cuáles requieren asistencia presencial.",

    sections: [
      {
        title: "Duración y modalidad",

        paragraphs: [
          "El curso tiene una duración informada de 60 horas, distribuidas en 8 días hábiles, en modalidad online mixta.",
          "El horario informado es de lunes a viernes, de 08:30 a 17:30. Consulta las próximas fechas y las actividades que requieren asistencia presencial.",
        ],
      },

      {
        title: "Valor del curso de conserje",

        paragraphs: [
          "El valor informado del curso es de $100.000 CLP.",
          "Antes de inscribirte, confirma qué incluye este valor y si corresponde algún trámite adicional.",
        ],
      },

      {
        ...comoInscribirte,

        paragraphs: [
          ...comoInscribirte.paragraphs,
          "Para ingresar a la nómina necesitas una copia legible de tu cédula de identidad vigente, por ambos lados. Si eres extranjero/a, se solicita residencia definitiva.",
        ],
      },

      {
        title: "Certificación y acreditación",

        paragraphs: [
          "Antes de inscribirte, consulta al equipo qué certificado se entrega, cuáles son sus condiciones de obtención y si corresponde algún trámite de acreditación.",
        ],
      },
    ],
  },

  {
    id: "cctv",

    seo: {
      title:
        "Curso de CCTV en Santiago: operación y monitoreo",

      description:
        "Curso de CCTV para aprender manejo de cámaras, configuración de monitoreo y revisión de grabaciones. Consulta valor y próximas fechas en Kaibo Security.",

      introduction:
        "Aprende sobre el manejo de cámaras de seguridad y la configuración de monitoreo con el curso de CCTV de Kaibo Security. La capacitación se enfoca en operación de cámaras, monitoreo, grabación y detección de incidentes. Consulta el programa, la modalidad y las próximas fechas con nuestro equipo de atención en Santiago Centro.",
    },

    slug: "curso-de-cctv",

    // Contenido enfocado en operación y monitoreo, no en instalación.
    indexable: true,

    title: "Curso de CCTV: Operación y Monitoreo de Cámaras",

    category: "VIDEOVIGILANCIA",

    description:
      "Aprende manejo de cámaras de seguridad, configuración de monitoreo y revisión de grabaciones CCTV.",

    detail:
      "Capacitación en operación de cámaras de seguridad y configuración de monitoreo CCTV, orientada al monitoreo de imágenes, la grabación y la detección de incidentes.",

    image: "/images/courses/cctv-provisional.webp",

    imageAlt:
      "Sala de monitoreo con pantallas de cámaras de seguridad CCTV.",

    // Valor previamente informado por el cliente.
    // Confirmar su vigencia antes de publicar.
    price: 70000,

    // Agregar duración, modalidad, requisitos y fechas
    // únicamente cuando el cliente los confirme.

    sections: [
      {
        title: "¿Qué aprenderás en el curso de CCTV?",

        items: [
          "Operación y manejo de cámaras de seguridad.",
          "Configuración de monitoreo de cámaras.",
          "Monitoreo de imágenes y grabaciones.",
          "Detección de incidentes mediante videovigilancia.",
        ],
      },

      {
        title: "¿A quién está dirigido?",

        paragraphs: [
          "A personas interesadas en aprender a manejar cámaras de seguridad y utilizar sistemas de monitoreo CCTV.",
          "Consulta al equipo si necesitas conocimientos previos y qué requisitos corresponden a esta capacitación.",
        ],
      },

      {
        title: "Valor y próximas fechas",

        paragraphs: [
          "El valor informado del curso de CCTV es de $70.000 CLP.",
          "Consulta las próximas fechas, la duración, la modalidad y el lugar donde se realiza la capacitación antes de inscribirte.",
        ],
      },

      {
        ...comoInscribirte,
      },

      {
        title: "Certificado del curso",

        paragraphs: [
          "Antes de inscribirte, confirma qué certificado se entrega y cuáles son las condiciones para obtenerlo.",
        ],
      },
    ],
  },

  {
    id: "baston-esposas",

    seo: {
      title:
        "Curso de bastón y esposas: capacitación presencial",

      description:
        "Curso presencial de bastón y esposas: jornada de 8 horas por $50.000 CLP. Atención en Santiago Centro. Consulta próximas fechas y lugar de realización.",

      introduction:
        "Conoce el curso presencial de bastón y esposas de Kaibo Security, con una duración informada de 8 horas. Revisa su valor y coordina tu inscripción con el equipo de atención en Santiago Centro. Confirma las próximas fechas, los requisitos, el horario y el lugar de realización antes de asistir.",
    },

    slug: "curso-de-baston-y-esposas",

    indexable: true,

    title: "Curso de Bastón y Esposas",

    category: "CAPACITACIÓN ESPECÍFICA",

    description:
      "Jornada presencial de capacitación en bastón y esposas. Consulta fechas, requisitos y lugar de realización.",

    detail:
      "Capacitación presencial en bastón y esposas, con una duración informada de 8 horas e inscripción previa.",

    image: "/images/courses/baston-provisional.webp",

    imageAlt:
      "Implementos de entrenamiento sobre una mesa de capacitación.",

    modality: "Presencial",

    duration: "Una jornada intensiva · 8 horas",

    price: 50000,

    notice:
      "Confirma el horario y el lugar de realización. La oficina de Santiago Centro es el punto de atención e inscripción.",

    sections: [
      {
        title: "Duración y valor",

        paragraphs: [
          "El curso se realiza en una jornada presencial de 8 horas, con un valor informado de $50.000 CLP.",
          "Consulta las próximas fechas, el horario, los requisitos y el lugar de realización.",
        ],
      },

      {
        ...comoInscribirte,
      },
    ],
  },
];