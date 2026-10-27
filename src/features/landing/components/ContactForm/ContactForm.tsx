"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import styles from "./ContactForm.module.css";

type Props = { courses: string[]; whatsapp: string };
type Values = {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
};
type Errors = Partial<Record<keyof Values, string>>;
const empty: Values = {
  name: "",
  email: "",
  phone: "",
  course: "",
  message: "",
};
const extraOptions = ["Capacitación para mi empresa", "Aún no lo sé"];

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 3) errors.name = "Escribe tu nombre completo.";
  if (!/^\S+@\S+\.\S+$/.test(v.email.trim()))
    errors.email = "Escribe un correo válido, por ejemplo nombre@correo.cl.";
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15)
    errors.phone = "Escribe un teléfono válido, por ejemplo +56 9 1234 5678.";
  if (!v.course) errors.course = "Elige un curso o una opción.";
  if (v.message.trim().length < 5)
    errors.message = "Cuéntanos brevemente en qué podemos ayudarte.";
  return errors;
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p
          id={id + "-error"}
          className={styles.error}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm({ courses, whatsapp }: Props) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  function update(field: keyof Values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSentUrl(null);
  }
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      document.getElementById("contact-" + firstError)?.focus();
      return;
    }
    // Se prepara la consulta localmente. El usuario confirma el envío en WhatsApp.
    const text = [
      "Hola, soy " + values.name.trim() + ".",
      "Me interesa: " + values.course + ".",
      values.message.trim(),
      "Mi correo: " +
        values.email.trim() +
        ". Mi teléfono: " +
        values.phone.trim() +
        ".",
    ].join("\n");
    const url =
      "https://wa.me/" +
      whatsapp.replace(/\D/g, "") +
      "?text=" +
      encodeURIComponent(text);
    window.open(url, "_blank", "noopener,noreferrer");
    setSentUrl(url);
  }
  const invalid = (field: keyof Values) => (errors[field] ? true : undefined);
  const described = (field: keyof Values) =>
    errors[field] ? "contact-" + field + "-error" : undefined;
  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      noValidate
    >
      <Field
        id="contact-name"
        label="Nombre completo"
        error={errors.name}
      >
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={invalid("name")}
          aria-describedby={described("name")}
          required
        />
      </Field>
      <div className={styles.row}>
        <Field
          id="contact-email"
          label="Correo electrónico"
          error={errors.email}
        >
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={invalid("email")}
            aria-describedby={described("email")}
            required
          />
        </Field>
        <Field
          id="contact-phone"
          label="Teléfono"
          error={errors.phone}
        >
          <input
            id="contact-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+56 9 1234 5678"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={invalid("phone")}
            aria-describedby={described("phone")}
            required
          />
        </Field>
      </div>
      <Field
        id="contact-course"
        label="Curso que te interesa"
        error={errors.course}
      >
        <div className={styles.select}>
          <select
            id="contact-course"
            value={values.course}
            onChange={(e) => update("course", e.target.value)}
            aria-invalid={invalid("course")}
            aria-describedby={described("course")}
            required
          >
            <option value="">Elige una opción</option>
            {[...courses, ...extraOptions].map((title) => (
              <option
                key={title}
                value={title}
              >
                {title}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            aria-hidden="true"
          />
        </div>
      </Field>
      <Field
        id="contact-message"
        label="¿En qué podemos ayudarte?"
        error={errors.message}
      >
        <textarea
          id="contact-message"
          rows={4}
          placeholder="Por ejemplo: fechas, requisitos o si tienen cupos."
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={invalid("message")}
          aria-describedby={described("message")}
          required
        />
      </Field>
      <button
        type="submit"
        className={styles.submit}
      >
        <FontAwesomeIcon
          icon={faWhatsapp}
          aria-hidden="true"
        />
        Continuar en WhatsApp
      </button>
      <p
        className={styles.help}
        role="status"
      >
        {sentUrl ? (
          <>
            Tu consulta está lista para enviar. Si WhatsApp no se abrió,{" "}
            <a
              href={sentUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              toca aquí
            </a>
            .
          </>
        ) : (
          "Se abrirá WhatsApp con tu consulta ya escrita; solo tienes que enviarla."
        )}
      </p>
    </form>
  );
}
