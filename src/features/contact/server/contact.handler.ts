import { validateContact, extraContactOptions } from "../contact.validation";
import type { ContactResult, ContactSubmission } from "../contact.types";

type Dependencies = {
  courses: string[];
  configured: boolean;
  send: (submission: ContactSubmission) => Promise<void>;
};
const reply = (body: ContactResult, status = 200) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

// Límite real: funciona también si no se envía Content-Length.
async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return null;
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > 16_384) {
      await reader.cancel();
      throw new RangeError("BODY_TOO_LARGE");
    }
    text += decoder.decode(value, { stream: true });
  }
  return JSON.parse(text + decoder.decode()) as unknown;
}

export async function handleContact(
  request: Request,
  dependencies: Dependencies,
) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return reply(
      {
        ok: false,
        message: "Envía tu consulta desde el formulario de Kaibo Security.",
      },
      403,
    );
  }
  if (
    !request.headers
      .get("content-type")
      ?.toLowerCase()
      .startsWith("application/json")
  ) {
    return reply(
      { ok: false, message: "El formato de la solicitud no es válido." },
      415,
    );
  }
  let input: unknown;
  try {
    input = await readBody(request);
  } catch (error) {
    return reply(
      {
        ok: false,
        message:
          error instanceof RangeError
            ? "La consulta es demasiado extensa."
            : "No pudimos leer la consulta.",
      },
      error instanceof RangeError ? 413 : 400,
    );
  }
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return reply(
      { ok: false, message: "Completa los datos del formulario." },
      400,
    );
  }
  const body = input as Record<string, unknown>;
  // Campo señuelo para bots. No dispara el proveedor.
  if (typeof body.website === "string" && body.website.length > 0)
    return reply({ ok: true, message: "Consulta recibida." });
  const result = validateContact(body, [
    ...dependencies.courses,
    ...extraContactOptions,
  ]);
  if (!result.valid)
    return reply(
      {
        ok: false,
        message: "Revisa los campos indicados.",
        errors: result.errors,
      },
      400,
    );
  if (
    typeof body.requestId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      body.requestId,
    )
  ) {
    return reply(
      { ok: false, message: "Actualiza la página y vuelve a intentarlo." },
      400,
    );
  }
  if (!dependencies.configured) {
    return reply(
      {
        ok: false,
        message:
          "El formulario no está disponible por el momento. Puedes contactarnos por los canales que aparecen junto al formulario.",
      },
      503,
    );
  }
  try {
    await dependencies.send({ ...result.values, requestId: body.requestId });
    return reply({
      ok: true,
      message:
        "Tu consulta fue enviada. Nuestro equipo te responderá en el horario de atención.",
    });
  } catch {
    // Nunca exponer claves ni respuestas internas del proveedor.
    return reply(
      {
        ok: false,
        message:
          "No pudimos enviar tu consulta. Tus datos siguen en el formulario; inténtalo nuevamente o utiliza nuestros otros canales de contacto.",
      },
      502,
    );
  }
}
