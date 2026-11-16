# Catálogo y fichas de cursos

- Ruta del catálogo: `/cursos`.
- Ficha individual: `/cursos/[slug]`.
- Datos compartidos: `src/features/landing/data/courses.ts`.
- Tipos: `src/features/landing/types/course.types.ts`.

Para agregar un curso, añade un bloque al arreglo con un `id` y un `slug` únicos.
`generateStaticParams` crea su ficha; el catálogo y los enlaces del pie se actualizan desde el mismo arreglo.

Los campos opcionales que faltan muestran una invitación a consultar, sin inventar información.
Agrega `startDate` y `endDate` únicamente cuando se confirme una nueva convocatoria.

`indexable: false` aplica `noindex` a la ficha y la excluye del sitemap. CCTV y Conserje permanecen en revisión.
El control global `NEXT_PUBLIC_SITE_INDEXABLE` se conserva: en entornos de revisión el sitio completo puede seguir con `noindex`.
Al completar y aprobar una ficha, cambia su `indexable` a `true`.

El catálogo conserva una tarjeta comparable por curso. La landing mantiene las tarjetas con fotografía y enlaces reales a sus fichas.
Los requisitos, precios, fechas y modalidad están visibles. Los desplegables se reservan para detalles extensos de inscripción y acreditación.

Las fotografías actuales son ilustrativas; reemplázalas por material real autorizado cuando esté disponible.

## SEO local

Cada curso admite `seo.title`, `seo.description` y `seo.introduction` en el arreglo de datos.
El título y la descripción alimentan metadatos y vistas compartidas; la introducción es visible en la ficha.
Las referencias a Santiago Centro describen el punto de atención. No confirman el lugar de clases.
No cambies los slugs para agregar palabras clave: las direcciones existentes se conservan.

Antes de publicar, comprueba en Vercel Production `NEXT_PUBLIC_SITE_URL=https://kaibosecurity.cl`
y `NEXT_PUBLIC_SITE_INDEXABLE=true`. En previews conserva la protección de indexación.
CCTV y Conserje mantienen `indexable: false` hasta completar y aprobar los datos pendientes.
Tras publicar, envía `/sitemap.xml` en Search Console e inspecciona las URLs finales que sean indexables.
El cambio facilita describir las páginas; no garantiza posiciones ni volúmenes de búsqueda.
