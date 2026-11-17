# Contacto por correo

API modular de Next.js App Router. No requiere un servidor separado ni base de datos.

## Archivos y responsabilidades

- `contact.types.ts`: contratos del formulario y respuesta.
- `contact.validation.ts`: validación compartida y límites por campo.
- `server/contact.handler.ts`: control de origen, límite de cuerpo (16 KB), honeypot, validación y respuestas HTTP.
- `server/contact.config.ts`: configuración privada y lista de destinatarios.
- `server/contact.email.ts`: plantilla HTML azul/dorada y alternativa de texto; escapa los datos ingresados.
- `server/resend.provider.ts`: envío HTTPS, timeout e idempotencia para reintentos.
- `src/app/api/contact/route.ts`: conecta las piezas con POST `/api/contact`.
- `src/features/landing/components/ContactForm/ContactForm.tsx`: campos y estados de envío accesibles.

## Configurar las pruebas reales

1. Copia `.env.example` a `.env.local` sin sobrescribir variables previas.
2. Crea una clave de Resend y completa `RESEND_API_KEY` solo en `.env.local`.
3. Mantén `CONTACT_EMAIL_TO=cr.sanmartino.react@gmail.com` para pruebas.
4. El remitente de prueba `onboarding@resend.dev` solo permite enviar al correo registrado en la cuenta de Resend. Registra la cuenta con tu dirección de pruebas o verifica un dominio propio.
5. Reinicia `pnpm dev`, envía una consulta ficticia y revisa bandeja/spam. La confirmación indica aceptación por Resend; no confirma llegada a la bandeja de entrada.

Sin configuración, la API devuelve 503 y el formulario informa que no está disponible. No simula un envío exitoso.

## Producción en Vercel

- Verifica un dominio o subdominio propio en Resend mediante sus registros DNS SPF/DKIM. No reemplaces los MX del correo que ya usa la empresa.
- Configura `RESEND_API_KEY`, `CONTACT_EMAIL_FROM` y `CONTACT_EMAIL_TO` en Vercel como variables privadas, sin `NEXT_PUBLIC_`.
- Usa como remitente una dirección del dominio verificado, por ejemplo `Kaibo Security <consultas@notificaciones.kaibosecurity.cl>` si verificas ese subdominio.
- Destinatario de producción confirmado: `CONTACT_EMAIL_TO=info@kaibosecurity.com`. Mantén `cr.sanmartino.react@gmail.com` exclusivamente durante las pruebas y retíralo antes de publicar. Si se confirman más integrantes, admite direcciones separadas por comas (máximo 10).
- El correo del visitante se usa en `reply_to`: responder la notificación responde al interesado. Nunca se usa como remitente.
- Despliega nuevamente tras configurar las variables.
- Antes de abrirlo a tráfico publicitario, configura rate limiting de POST `/api/contact` en Vercel Firewall. Honeypot y origen no sustituyen un límite persistente; se evita un contador de memoria local que no funciona entre instancias serverless.
- No se guardan consultas en una base de datos ni se manda confirmación automática al visitante. Cada integrante configurado recibe la misma consulta; coordinen quién responde.
- La fecha de recepción se muestra en el cliente de correo. El contenido no incluye una fecha variable para mantener idéntico el payload de los reintentos.

## Pruebas sin consumir correos

`node --test src/features/contact/tests/contact.test.mjs`

Se usa el compilador TypeScript ya instalado y transportes simulados. No se necesitan claves ni se envían correos reales.

Para generar una vista previa HTML: `node src/features/contact/tests/preview-email.mjs RUTA_DE_SALIDA.html`.

Documentación del proveedor: https://resend.com/docs/api-reference/emails/send-email
