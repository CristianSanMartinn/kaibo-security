import type { ContactMail, ContactValues } from "../contact.types";

export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]!,
  );
}

// HTML con tablas e inline styles para compatibilidad con Gmail y Outlook.
export function buildContactEmail(values: ContactValues): ContactMail {
  const safe = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, escapeHtml(value)]),
  ) as ContactValues;
  const mailto = escapeHtml("mailto:" + encodeURIComponent(values.email));
  const telephone = escapeHtml("tel:" + values.phone.replace(/[^+\d]/g, ""));
  const row = (label: string, content: string) =>
    `<tr><td style="padding:13px 10px 13px 0;width:100px;vertical-align:top;color:#aebfd0;font-size:14px;border-bottom:1px solid #29445e;">${label}</td><td style="padding:13px 0;vertical-align:top;color:#f5f7fa;font-size:14px;border-bottom:1px solid #29445e;word-break:break-word;overflow-wrap:anywhere;">${content}</td></tr>`;
  // Sin fecha variable: el mismo reintento conserva el payload para la idempotencia.
  // La fecha de recepción queda en la bandeja/proveedor.
  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Nueva consulta | Kaibo Security</title></head>
<body style="margin:0;padding:0;background:#091827;font-family:Arial,Helvetica,sans-serif;color:#f5f7fa;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Nueva consulta de ${safe.name} sobre ${safe.course}.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#091827;"><tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="600" cellspacing="0" cellpadding="0" style="width:100%;max-width:600px;background:#0d2138;border:1px solid #29445e;border-top:4px solid #f4b41a;border-radius:12px;"><tr><td style="padding:30px 26px;">
<p style="margin:0 0 26px;font-size:18px;font-weight:bold;letter-spacing:1px;">KAIBO <span style="color:#f4b41a;">SECURITY</span></p>
<p style="margin:0 0 16px;color:#f4b41a;font-size:12px;font-weight:bold;letter-spacing:1.3px;">NUEVA CONSULTA · FORMULARIO WEB</p>
<h1 style="margin:0 0 12px;font-size:25px;line-height:1.35;word-break:break-word;">${safe.name} quiere información.</h1>
<p style="margin:0 0 22px;color:#aebfd0;font-size:15px;line-height:1.7;">Interés: <strong style="color:#f5f7fa;">${safe.course}</strong></p>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;table-layout:fixed;">
${row("Nombre", safe.name)}
${row("Correo", `<a href="${mailto}" style="color:#f4b41a;text-decoration:underline;">${safe.email}</a>`)}
${row("Teléfono", `<a href="${telephone}" style="color:#f5f7fa;text-decoration:underline;">${safe.phone}</a>`)}
${row("Curso", safe.course)}
</table>
<h2 style="margin:26px 0 12px;color:#f4b41a;font-size:13px;letter-spacing:1px;">MENSAJE</h2>
<div style="padding:18px;background:#122e4e;border-left:3px solid #f4b41a;font-size:15px;line-height:1.8;word-break:break-word;">${safe.message.replace(/\r?\n/g, "<br>")}</div>
<p style="margin:26px 0;"><a href="${mailto}" style="display:inline-block;padding:14px 22px;border-radius:6px;background:#f4b41a;color:#0d2138;text-decoration:none;font-size:14px;font-weight:bold;">Responder consulta</a></p>
<p style="margin:0;color:#aebfd0;font-size:13px;line-height:1.7;">Si respondes este correo, tu mensaje llegará directamente a ${safe.name}. Esta consulta no confirma una inscripción ni un pago.</p>
<p style="margin:26px 0 0;padding-top:18px;border-top:1px solid #29445e;color:#aebfd0;font-size:12px;line-height:1.7;">Kaibo Security · Aviso interno para el equipo.<br>Consulta recibida desde el formulario de contacto del sitio web.</p>
</td></tr></table></td></tr></table></body></html>`;
  return {
    subject: "Nueva consulta: " + values.course,
    replyTo: values.email,
    html,
    text: [
      "Nueva consulta | Kaibo Security",
      "Nombre: " + values.name,
      "Correo: " + values.email,
      "Teléfono: " + values.phone,
      "Curso: " + values.course,
      "",
      "Mensaje:",
      values.message,
      "",
      "Responde este correo para contactar directamente al interesado.",
    ].join("\n"),
  };
}
