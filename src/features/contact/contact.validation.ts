import type { ContactErrors, ContactValues } from "./contact.types";

export const extraContactOptions = [
  "Capacitación para mi empresa",
  "Aún no lo sé",
];
export const contactLimits = {
  name: 100,
  email: 254,
  phone: 30,
  course: 180,
  message: 3000,
};

// La misma validación se ejecuta en el navegador y de nuevo en el servidor.
export function validateContact(input: unknown, options: readonly string[]) {
  const source =
    input && typeof input === "object" && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : {};
  const values: ContactValues = {
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  };
  const errors: ContactErrors = {};
  for (const field of Object.keys(values) as (keyof ContactValues)[]) {
    const value = source[field];
    if (typeof value !== "string") {
      errors[field] = "Completa este campo.";
      continue;
    }
    values[field] = value.trim();
    if (value.length > contactLimits[field]) {
      errors[field] = `Usa un máximo de ${contactLimits[field]} caracteres.`;
    }
  }
  if (
    !errors.name &&
    (values.name.length < 3 || /[\r\n\x00-\x1f\x7f]/.test(values.name))
  ) {
    errors.name = "Escribe tu nombre completo.";
  }
  if (!errors.email && !/^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/.test(values.email)) {
    errors.email = "Escribe un correo válido, por ejemplo nombre@correo.cl.";
  }
  const digits = values.phone.replace(/\D/g, "");
  if (
    !errors.phone &&
    (digits.length < 8 ||
      digits.length > 15 ||
      !/^\+?[\d\s().-]+$/.test(values.phone))
  ) {
    errors.phone = "Escribe un teléfono válido, por ejemplo +56 9 1234 5678.";
  }
  if (!errors.course && !options.includes(values.course))
    errors.course = "Elige un curso o una opción de la lista.";
  if (
    !errors.message &&
    (values.message.length < 5 ||
      /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(values.message))
  ) {
    errors.message = "Cuéntanos brevemente en qué podemos ayudarte.";
  }
  return { values, errors, valid: Object.keys(errors).length === 0 };
}
