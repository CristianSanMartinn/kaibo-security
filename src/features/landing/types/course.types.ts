// Los campos opcionales solo se muestran cuando el cliente confirma su valor.
export type Course = {
  id: string;
  slug: string;
  indexable: boolean;
  title: string;
  category: string;
  // Texto propio de la ficha y sus resultados de búsqueda; no altera el nombre del curso.
  seo?: {
    title: string;
    description: string;
    introduction: string;
  };
  description: string;
  detail: string;
  image: string;
  imageAlt: string;
  duration?: string;
  modality?: string;
  price?: number;
  startDate?: string;
  endDate?: string;
  schedule?: string;
  modalityNote?: string;
  notice?: string;
  registrationLabel?: string;
  sections?: {
    title: string;
    paragraphs?: string[];
    items?: string[];
    notice?: string;
  }[];
  contents?: string[];
  requirements?: string[];
};
