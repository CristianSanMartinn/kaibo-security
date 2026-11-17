import "server-only";
import type { MailConfig } from "./resend.provider";

export function getMailConfig(): MailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_EMAIL_FROM?.trim();
  const to = process.env.CONTACT_EMAIL_TO?.split(",")
    .map((email) => email.trim())
    .filter(Boolean);
  const email = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;
  const sender = from?.match(/<([^<>]+)>$/)?.[1] || from;
  if (
    !apiKey ||
    !from ||
    !sender ||
    !email.test(sender) ||
    /[\r\n]/.test(from) ||
    !to?.length ||
    to.length > 10 ||
    to.some((recipient) => !email.test(recipient))
  )
    return null;
  return { apiKey, from, to };
}
