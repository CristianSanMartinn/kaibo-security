import test from "node:test";
import assert from "node:assert/strict";
import { loadModule } from "./load-module.mjs";

const { validateContact } = await loadModule("../contact.validation.ts");
const { buildContactEmail } = await loadModule("../server/contact.email.ts");
const { sendWithResend } = await loadModule("../server/resend.provider.ts");
const { handleContact } = await loadModule("../server/contact.handler.ts");
const values = {
  name: "Persona de Prueba",
  email: "visitante@example.com",
  phone: "+56 9 1234 5678",
  course: "Curso de CCTV",
  message: "Quisiera consultar las próximas fechas.",
};
const requestId = "12345678-1234-4234-8234-123456789abc";
const options = [values.course];
const body = { ...values, website: "", requestId };
function request(data = body, headers = {}) {
  return new Request("https://kaibosecurity.cl/api/contact", {
    method: "POST",
    headers: {
      origin: "https://kaibosecurity.cl",
      "content-type": "application/json",
      ...headers,
    },
    body: typeof data === "string" ? data : JSON.stringify(data),
  });
}
const dependencies = (send = async () => {}) => ({
  configured: true,
  courses: options,
  send,
});

test("normaliza los datos y rechaza cursos no ofrecidos y tipos incorrectos", () => {
  assert.equal(
    validateContact({ ...values, name: "  Persona de Prueba  " }, options)
      .values.name,
    values.name,
  );
  for (const input of [
    null,
    [],
    { ...values, email: [] },
    { ...values, course: "Curso inexistente" },
    { ...values, name: "Ana\r\nBcc:foo@example.com" },
    { ...values, email: "a@example.com\nBcc:b@example.com" },
    { ...values, phone: "abcdefgh123456789" },
    { ...values, message: "a".repeat(3001) },
  ]) {
    assert.equal(validateContact(input, options).valid, false);
  }
});

test("la plantilla escapa HTML, conserva saltos y apunta la respuesta al visitante", () => {
  const mail = buildContactEmail({
    ...values,
    name: '<img src=x onerror="bad()">',
    message: "Hola <script>bad()</script>\nOtra línea & más",
  });
  assert.ok(!mail.html.includes("<script>"));
  assert.ok(!mail.html.includes("<img src=x"));
  assert.ok(mail.html.includes("&lt;script&gt;"));
  assert.ok(mail.html.includes("<br>Otra línea &amp; más"));
  assert.equal(mail.replyTo, values.email);
  assert.ok(mail.text.includes("Hola <script>"));
});

test("el proveedor usa destinatarios del servidor y la misma clave para reintentos", async () => {
  const calls = [];
  const config = {
    apiKey: "fake-test-key",
    from: "Kaibo <noreply@example.com>",
    to: ["equipo@example.com"],
  };
  const mail = buildContactEmail(values);
  const fakeFetch = async (url, init) => {
    calls.push({ url, init });
    return Response.json({ id: "test-email-id" });
  };
  await sendWithResend(mail, config, requestId, fakeFetch);
  await sendWithResend(mail, config, requestId, fakeFetch);
  const sent = JSON.parse(calls[0].init.body);
  assert.deepEqual(sent.to, config.to);
  assert.equal(sent.reply_to, values.email);
  assert.equal(sent.from, config.from);
  assert.equal(
    calls[0].init.headers["Idempotency-Key"],
    calls[1].init.headers["Idempotency-Key"],
  );
  assert.equal(calls[0].init.body, calls[1].init.body);
  await assert.rejects(
    sendWithResend(
      mail,
      config,
      requestId,
      async () => new Response("provider details", { status: 429 }),
    ),
  );
});

test("el endpoint devuelve errores por campo sin enviar correos", async () => {
  let sends = 0;
  const response = await handleContact(
    request({ ...body, email: "incorrecto", to: "attacker@example.com" }),
    dependencies(async () => sends++),
  );
  assert.equal(response.status, 400);
  assert.ok((await response.json()).errors.email);
  assert.equal(sends, 0);
});

test("bloquea origen ajeno, cuerpos grandes, JSON inválido y tipos no soportados", async () => {
  for (const [req, expected] of [
    [request(body, { origin: "https://otro.example" }), 403],
    [request(body, { "content-type": "text/plain" }), 415],
    [request("{invalid"), 400],
    [request({ ...body, message: "x".repeat(17000) }), 413],
    [request({ ...body, requestId: "invalid" }), 400],
  ]) {
    assert.equal(
      (
        await handleContact(
          req,
          dependencies(async () => {
            throw new Error("must not send");
          }),
        )
      ).status,
      expected,
    );
  }
});

test("honeypot descarta spam sin llamar al proveedor", async () => {
  let sends = 0;
  const response = await handleContact(
    request({ ...body, website: "https://spam.example" }),
    dependencies(async () => sends++),
  );
  assert.equal(response.status, 200);
  assert.equal(sends, 0);
});

test("sin configuración no anuncia un envío exitoso", async () => {
  const response = await handleContact(request(), {
    ...dependencies(),
    configured: false,
  });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, false);
});

test("fallos del proveedor se ocultan y el éxito solo aparece tras el envío", async () => {
  const failed = await handleContact(
    request(),
    dependencies(async () => {
      throw new Error("secret-provider-detail");
    }),
  );
  assert.equal(failed.status, 502);
  assert.ok(!(await failed.text()).includes("secret-provider-detail"));
  let submitted;
  const ok = await handleContact(
    request({ ...body, to: "attacker@example.com" }),
    dependencies(async (data) => {
      submitted = data;
    }),
  );
  assert.equal(ok.status, 200);
  assert.equal((await ok.json()).ok, true);
  assert.equal(submitted.email, values.email);
  assert.equal(submitted.to, undefined);
});
