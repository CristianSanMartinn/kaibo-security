// Los campos opcionales solo se muestran cuando el cliente confirma su valor.
export type Course = {
  id: string;
  title: string;
  category: string;
  description: string;
  detail: string;
  image: string;
  imageAlt: string;
  duration?: string;
  modality?: string;
  price?: number;
  contents?: string[];
  requirements?: string[];
};
