"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { ChevronDown, Mail, LoaderCircle } from "lucide-react";
import {
  validateContact,
  extraContactOptions,
  contactLimits,
} from "@/features/contact/contact.validation";
import type {
  ContactValues as Values,
  ContactErrors as Errors,
  ContactResult,
} from "@/features/contact/contact.types";
import styles from "./ContactForm.module.css";

type Props = { courses: string[] };

const empty: Values = {
  name: "",
  email: "",
  phone: "",
  course: "",
  message: "",
};
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

export default function ContactForm({ courses }: Props) {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");
  const [website, setWebsite] = useState("");
  const sending = useRef(false);
  const requestId = useRef<string | null>(null);

  function update(field: keyof Values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus("idle");
    setFeedback("");
    requestId.current = null;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current || status === "success") return;
    const result = validateContact(values, [
      ...courses,
      ...extraContactOptions,
    ]);
    setErrors(result.errors);
    const firstError = Object.keys(result.errors)[0];
    if (firstError) {
      document.getElementById("contact-" + firstError)?.focus();
      return;
    }
    sending.current = true;
    setStatus("sending");
    setFeedback("Enviando tu consulta…");
    try {
      // La clave de Resend y los destinatarios viven exclusivamente en el servidor.
      requestId.current ||= crypto.randomUUID();
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.values,
          website,
          requestId: requestId.current,
        }),
        signal: AbortSignal.timeout(20_000),
      });
      const data = (await response.json()) as ContactResult;
      if (!response.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
          const first = Object.keys(data.errors)[0];
          document.getElementById("contact-" + first)?.focus();
        }
        setStatus("error");
        setFeedback(
          data.message ||
            "No pudimos enviar la consulta. Inténtalo nuevamente.",
        );
        return;
      }
      setStatus("success");
      setFeedback(data.message);
    } catch {
      setStatus("error");
      setFeedback(
        "No pudimos confirmar el envío. Conservamos tus datos; puedes volver a intentarlo.",
      );
    } finally {
      sending.current = false;
    }
  }
  const invalid = (field: keyof Values) => (errors[field] ? true : undefined);
  const described = (field: keyof Values) =>
    errors[field] ? "contact-" + field + "-error" : undefined;
  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      noValidate
      aria-busy={status === "sending"}
    >
      {/* Campo señuelo oculto a usuarios y lectores de pantalla. */}
      <div
        className={styles.honeypot}
        aria-hidden="true"
      >
        <label htmlFor="contact-website">Deja este campo vacío</label>
        <input
          id="contact-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>
      <fieldset
        className={styles.fields}
        disabled={status === "sending"}
      >
        <legend className="sr-only">Datos de tu consulta</legend>
        <Field
          id="contact-name"
          label="Nombre completo"
          error={errors.name}
        >
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            maxLength={contactLimits.name}
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
              maxLength={contactLimits.email}
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
              maxLength={contactLimits.phone}
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
              {[...courses, ...extraContactOptions].map((title) => (
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
            maxLength={contactLimits.message}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            aria-invalid={invalid("message")}
            aria-describedby={described("message")}
            required
          />
        </Field>
      </fieldset>
      <button
        type="submit"
        className={styles.submit}
        disabled={status === "sending" || status === "success"}
      >
        {status === "sending" ? (
          <LoaderCircle
            className={styles.spinner}
            aria-hidden="true"
          />
        ) : (
          <Mail aria-hidden="true" />
        )}
        {status === "sending"
          ? "Enviando…"
          : status === "success"
            ? "Consulta enviada"
            : "Enviar consulta"}
      </button>
      <p
        className={styles.help}
        role={status === "error" ? "alert" : "status"}
        data-state={status}
      >
        {feedback ||
          "Enviaremos tu consulta al equipo de Kaibo Security. Te responderemos al correo que indiques."}
      </p>
    </form>
  );
}
