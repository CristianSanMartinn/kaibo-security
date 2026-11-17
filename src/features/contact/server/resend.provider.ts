import type { ContactMail } from "../contact.types";

export type MailConfig = { apiKey: string; from: string; to: string[] };

// Adaptador HTTPS: las claves y destinatarios se reciben solo desde el servidor.
export async function sendWithResend(
  mail: ContactMail,
  config: MailConfig,
  requestId: string,
  fetcher: typeof fetch = fetch,
) {
  const response = await fetcher("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + config.apiKey,
      "Content-Type": "application/json",
      "Idempotency-Key": "contact-" + requestId,
    },
    body: JSON.stringify({
      from: config.from,
      to: config.to,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      reply_to: mail.replyTo,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error("MAIL_PROVIDER_FAILED");
  const result: unknown = await response.json();
  if (
    !result ||
    typeof result !== "object" ||
    !("id" in result) ||
    typeof result.id !== "string"
  ) {
    throw new Error("MAIL_PROVIDER_INVALID_RESPONSE");
  }
}
