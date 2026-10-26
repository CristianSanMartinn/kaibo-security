# Entrega de la landing completa — Kaibo Security

La página está implementada en `C:\Users\Cristian\Desktop\kaibo-security` y preparada para revisión local. No se ha publicado ni se han hecho commits o push.

## Incluido

- Navbar sticky y menú móvil.
- Hero con fondo completo, imagen provisional y soporte para video futuro; mantiene la portada fija sin las barras ni controles retirados.
- Nosotros con fotografía de una sala de capacitación, texto, botón, profundidad y borde luminoso animado.
- Beneficios con iconografía.
- Cuatro capacitaciones en carrusel manual con scroll snap, deslizamiento nativo, flechas condicionadas al espacio, navegación por teclado y selección resaltada.
- Panel único de detalle: cambia con el curso seleccionado, conserva el desplazamiento del carrusel, recibe el foco y lo devuelve al cerrar con botón o Escape.
- Empresas, preguntas frecuentes con acordeones nativos, contacto sin formulario, cierre y Footer.
- Metadatos y Open Graph básicos; noindex por defecto, robots y sitemap de revisión.
- CSS Modules y TypeScript en formato vertical con comentarios de mantenimiento.
- Guía `docs/MANTENIMIENTO.md`, también entregada como `Guia-mantenimiento-Kaibo.md`.

No se añadieron dependencias para los carruseles. Las seis imágenes servidas se optimizaron a WebP: 567.824 bytes en conjunto frente a 11.510.415 bytes de los PNG originales, una reducción aproximada del 95%. Los originales se conservaron.

## Validaciones

Correctos: `pnpm format:check`, `pnpm lint`, `pnpm exec tsc --noEmit` y `pnpm build`.

Comprobaciones adicionales sobre datos y HTML compilado: cuatro IDs de curso únicos; imágenes locales existentes; mensaje de WhatsApp con caracteres especiales codificado y recuperado correctamente; canales vacíos rechazados; destinos de navegación presentes; un h1, un Navbar y un Footer; ausencia de enlaces `href="#"`; retirada de los bloques de continuación; noindex presente.

No se afirma haber probado la interacción final, el responsive ni la animación final en navegador: la herramienta de navegador bloqueó el acceso local. Tampoco se ha probado el video real, que aún no está disponible, ni una exportación `output: "export"`.

## Pendiente de confirmación

Logo y favicon originales; número, correo, dirección, horarios y redes oficiales; nombres y oferta vigente de los cursos, valores, duración, modalidad, temarios, requisitos y fechas; aprobación de contenido y alcance para empresas; video original y aprobación comercial para publicar.

Los campos sin confirmar permanecen vacíos o señalizados. No se inventaron montos, certificaciones, cifras ni testimonios. WhatsApp se activa desde `src/config/site.ts` cuando se introduzca el número confirmado. Las fotografías son ilustrativas generadas con IA, no evidencia de instalaciones o personal reales.

## Archivos de entrega

- `kaibo-security-completo.zip`: fuentes, configuraciones, documentación y recursos; excluye node_modules, .next, Git y archivos de entorno.
- `Guia-mantenimiento-Kaibo.md`: instrucciones de edición.

Las nuevas imágenes se instalaron en:

- `public/images/courses/cctv-provisional.webp`
- `public/images/courses/conserje-provisional.webp`
- `public/images/courses/baston-provisional.webp`
- `public/images/companies/equipo-provisional.webp`

## Prompts finales de las nuevas imágenes

Se utilizó la herramienta nativa ImageGen, con un prompt completo por recurso. Cada prompt se forma concatenando el prefijo, la escena y el sufijo indicados a continuación.

**Prefijo común:**

Use case: photorealistic-natural. Asset type: provisional corporate website photograph for Chilean private-security training company Kaibo Security. Landscape 3:2 editorial photo.

**CCTV:**

A Latin American adult private security operator in navy polo shirt seen in three-quarter profile in a professional CCTV training lab, multiple wall monitors showing generic empty building entrances and corridors, instructor beside the desk, blue monitor glow and natural soft daylight. No identifiable people on screens, no readable interface text.

**Conserjería:**

A Latin American adult concierge in a navy uniform at a modern residential building reception desk, calm professional posture, speaking with a visitor standing on the other side, generic glass lobby and wood finishes, daytime editorial photography. No logos, no readable text.

**Bastón y Esposas:**

A safety instructor in navy polo in a training classroom explaining nonviolent equipment awareness to adult students; a standard training baton and open handcuffs placed neatly on a desk in foreground, no weapons being held, no restraints on people, no confrontation or violence. Neutral bright training environment.

**Empresas:**

A small mixed group of Latin American business staff and a private security training advisor discussing a training plan around a table in a modern office, navy shirts and smart casual clothing, notebooks, natural warm daylight, realistic professional meeting, no readable documents.

**Sufijo común:**

Authentic realistic people and hands, restrained navy and warm gold palette, professional natural lighting, clean composition with crop-safe subjects centered. No police or military insignia, no badges, no flags, no logos, no watermark, no embedded typography. Conceptual image, not a representation of real company personnel or premises.
