# Vista de cursos: grilla y modal

Implementación de P1 y P2 del brief, con ajustes locales de accesibilidad, imagen optimizada, textos existentes y CTA verde. La sección Nosotros conserva su estructura; únicamente se igualó el color de su botón de WhatsApp.

## Cambios

- CoursesGrid reemplaza CoursesCarousel: cuatro columnas desde 64rem, dos desde 40rem y una en celular. Las cuatro tarjetas conservan la misma altura.
- CourseCard ofrece un único botón que cubre toda la tarjeta, con teclado, foco visible, categoría, imagen, duración, modalidad y valor. Se eliminan numeración, ayuda, preview y efectos de capas.
- CourseDetails usa dialog y showModal. Encabezado y footer quedan fijos; solo el cuerpo hace scroll. El banner ocupa todo el ancho y los details comparten name para abrir solo uno.
- Cierre con X, Escape o fondo; vuelve el foco al botón original y se restaura el scroll del body. El modal respeta reducir movimiento y no agrega librerías.
- WhatsApp usa mensaje por curso, objetivo táctil de al menos 44 px y el verde del navbar.
- Se conserva la descripción ampliada de CCTV, sin inventar fechas, modalidad ni precio.

## Validación

ESLint, tsc --noEmit y next build correctos. Revisión interactiva en navegador mediante la API Playwright del navegador integrado, sin agregar dependencias.

| Ancho CSS | Columnas | Título, precio y CTA visibles en modal | Desbordamiento horizontal |
| --- | --- | --- | --- |
| 1440 | 4 | Sí | No |
| 1024 | 4 | Sí | No |
| 768 | 2 | Sí | No |
| 390 | 1 | Sí | No |

Se verificaron apertura con Enter, cierre con X/Escape/fondo, retorno de foco, bloqueo de scroll y exclusividad de acordeones con altura estable. No se realizó una prueba con NVDA/VoiceOver ni con teléfonos físicos. No se midió Lighthouse.

Contraste calculado: texto claro #d9e2ec sobre #0d2138 = 12,42:1 aproximadamente; blanco sobre CTA #128044 = 5,00:1 aproximadamente.

## Capturas

- [Grilla en computador](cursos-grilla-1440.png)
- [Modal en computador](cursos-modal-1440.png)
- [Grilla en tablet](cursos-grilla-768.png)
- [Modal en tablet](cursos-modal-768.png)
- [Grilla en celular](cursos-grilla-390.png)
- [Modal en celular](cursos-modal-390.png)
- [Modal de 1024 px](cursos-modal-1024.png)

## Pendientes de datos

Se mantienen los datos actuales y los comentarios del cliente: acreditación de Conserje, información comercial de CCTV, horario y sede de Bastón y Esposas. No se inventaron datos ni se publicaron fotos nuevas. Las fotos reales y la confirmación de los datos del equipo siguen fuera de esta etapa.


