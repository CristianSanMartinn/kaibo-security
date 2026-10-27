# Guía de mantenimiento — Kaibo Security

Proyecto: `C:\Users\Cristian\Desktop\kaibo-security`.

La landing está implementada con Next.js, React, TypeScript, CSS Modules y Lucide React. No utiliza Tailwind, backend, base de datos ni formularios. El código contiene comentarios sobre los puntos de edición y las decisiones interactivas.

## Iniciar y validar

```powershell
Set-Location "C:\Users\Cristian\Desktop\kaibo-security"
pnpm install
pnpm dev
```

Abrir la dirección local que imprima Next.js. Después de editar:

```powershell
pnpm format
pnpm format:check
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Prettier conserva el código vertical, con dos espacios de sangría y una propiedad CSS por línea. No es necesario modificar `node_modules` ni `.next`: son carpetas generadas.

## Dónde cambiar cada cosa

| Qué quieres modificar | Archivo |
| --- | --- |
| Orden de las secciones | `src/features/landing/components/LandingPage/LandingPage.tsx` |
| Teléfono oficial, correo, dirección, horarios, logo y URL | `src/config/site.ts` |
| Enlaces del menú | `src/config/navigation.ts` |
| Redes oficiales | `src/config/social.ts` |
| Pendientes antes de publicar | `src/config/pending.ts` |
| Colores, tamaños y espaciados compartidos | `src/styles/tokens.css` |
| Tipografía | `src/styles/typography.css` |
| Textos y fondo del Hero | `src/features/landing/data/hero.ts` |
| Texto e imagen de Nosotros | `src/features/landing/components/About/About.tsx` |
| Beneficios | `src/features/landing/data/benefits.ts` |
| Cursos y sus fichas | `src/features/landing/data/courses.ts` |
| Campos disponibles de un curso | `src/features/landing/types/course.types.ts` |
| Preguntas frecuentes | `src/features/landing/data/faq.ts` |
| Texto de Empresas | `src/features/landing/components/Companies/Companies.tsx` |
| Paneles y canales de contacto | `src/features/landing/components/Contact/Contact.tsx` |
| Cierre y pie de página | `FinalCTA/FinalCTA.tsx` y `src/components/layout/Footer/Footer.tsx` |

Los estilos de cada componente están en el `.module.css` de su misma carpeta. Los nombres de clase se aplican mediante `styles.nombre` y no interfieren con otros componentes.

## Cursos: contenido y comportamiento

Cada objeto de `courses.ts` necesita un `id` único, título, categoría, descripción breve, descripción ampliada e imagen. Para agregar otro curso, añade un objeto siguiendo la estructura de los existentes.

Los campos `duration`, `modality`, `price`, `contents` y `requirements` son opcionales. Se muestran únicamente cuando tienen contenido. No inventes esos datos: el catálogo actual conserva las cuatro denominaciones identificadas en el sitio anterior y requiere validación del cliente.

`price` se escribe como número en pesos chilenos, sin separadores ni símbolo. La interfaz lo convierte a CLP. Si falta, muestra «Consultar valor».

La imagen se guarda bajo `public/images/courses/`. Una referencia como `/images/courses/cctv-provisional.webp` empieza en `public`; no se escribe `public` en la URL.

`CoursesCarousel.tsx` controla el desplazamiento y la selección. Usa scroll nativo, ResizeObserver y scroll snap; no hay bucle infinito, duplicación ni avance automático. Los anchos de tarjeta se cambian en `CoursesCarousel.module.css`:

- Celular: 86% del ancho del carrusel.
- Tablet: 46%.
- Escritorio: 30%.

Al elegir un curso, se resalta su tarjeta y aparece un solo panel debajo. El foco se dirige al detalle sin volver a montar el carrusel. Al cerrar con el botón o Escape, vuelve al botón que lo abrió. También se admite elegir de nuevo el mismo curso.

## WhatsApp y redes

El número se configura en `siteConfig.whatsapp` solo después de confirmarlo con el cliente. `getWhatsAppUrl` limpia el formato, verifica que haya una cantidad válida de dígitos y codifica el mensaje. Eso verifica el formato, no la titularidad del número.

Mientras el número esté vacío, los botones están desactivados. No hay enlaces a números ficticios. El detalle de cada curso añade su nombre al mensaje automáticamente.

Para redes, completa `socialLinks` con objetos `{ label, href }` usando las URLs HTTPS oficiales. Con la lista vacía no se generan perfiles falsos. Correo, dirección y horarios también se mantienen pendientes hasta confirmar su vigencia.

## Hero y video

El Hero conserva la portada fija solicitada: sin barras, contador ni botones de carrusel. La imagen cubre toda la sección y tiene un degradado para leer el texto.

`heroMedia.image` es la imagen actual. Cuando tengas un video original, guárdalo en `public/videos/hero/` y asigna su ruta pública a `heroMedia.video`. La imagen seguirá sirviendo como poster y alternativa si falla el video.

HeroMedia incluye reproducción silenciosa, inline, bucle, pausa manual, suspensión por pestaña oculta y respeto por movimiento reducido. La reproducción con un archivo real sigue pendiente de prueba.

## Luz del borde en Nosotros

En `About.module.css`, `.panel` usa un gradiente cónico como borde. `@property --about-border-angle` permite animar el ángulo en `borderOrbit`.

- Velocidad: cambia `8s` en la propiedad `animation`.
- Color: cambia los colores dorados del `conic-gradient`.
- Grosor: cambia `border: 2px solid transparent`.
- Profundidad: modifica `box-shadow`.

El efecto se pausa con hover o foco y se desactiva con `prefers-reduced-motion`. No cambia el fondo sólido que protege la lectura del texto.

## Accesibilidad y navegación

Navbar y Footer se montan una vez en `layout.tsx`. El enlace «Saltar al contenido» lleva al `main`. Los destinos de navegación tienen IDs estables.

MobileMenu es un desplegable, no un modal. Usa Tab normal, comunica `aria-expanded`, cierra con Escape y devuelve el foco al botón. Al seleccionar un destino, cierra y enfoca la sección. Los elementos ocultos no permanecen en la navegación por teclado.

Las preguntas frecuentes usan `details` y `summary`, que funcionan sin JavaScript. Los enlaces se usan para navegar; los botones ejecutan acciones.

## Imágenes provisionales

Las seis imágenes son ilustrativas generadas con la herramienta nativa ImageGen; no representan instalaciones ni personal real de Kaibo Security. Se conservaron los PNG originales y se crearon versiones WebP para la página. Las versiones servidas pesan en conjunto aproximadamente 568 KB frente a 11,5 MB de los originales (95% menos).

Reemplázalas por recursos originales autorizados cuando estén disponibles. Actualiza también el texto alternativo y retira las leyendas de IA solo cuando ya no se usen imágenes generadas.

## SEO, entrega y publicación

Esta es una versión local de revisión. `NEXT_PUBLIC_SITE_INDEXABLE` permanece desactivado por defecto; los metadatos dicen noindex, robots bloquea rastreo y el sitemap queda vacío. El sitio no se ha publicado ni se han cambiado dominio, hosting o correo.

Después de la aprobación, define `NEXT_PUBLIC_SITE_URL` con el origen HTTPS real. La indexación solo debe activarse en el entorno final mediante `NEXT_PUBLIC_SITE_INDEXABLE=true` y un nuevo build.

El build actual prerenderiza la landing y las rutas de metadatos. No se ha validado `output: "export"`: antes de usar un hosting estrictamente estático, hay que revisar `cacheComponents`, `partialPrefetching` y las rutas de metadatos de esta versión de Next.js. No se añadieron APIs ni funciones de servidor necesarias para la interacción.

## Pendientes reales

1. Favicon original (el logo ya está integrado).
2. Confirmación comercial de los contactos y horarios tomados del sitio oficial.
3. Oferta vigente, precios, duración, modalidad, temarios, requisitos y fechas.
4. Aprobación de textos, beneficios y alcance para empresas.
5. Video original del Hero y prueba de reproducción.
6. Pruebas finales en teléfonos físicos y navegadores adicionales antes de publicar. Se revisó la interfaz actual en navegador local con distintos anchos.

El repositorio queda sin commits ni push, conforme a las instrucciones anteriores. La copia ZIP contiene fuentes y recursos, sin dependencias, compilados, credenciales ni metadatos de Git.

## Paleta oscura de Kaibo

Se aplicaron los colores de los estilos del sitio original: azul marino #0D2138, azul secundario #122E4E, amarillo #F4B41A y texto claro #D9E2EC. Las tarjetas elevadas usan #1B3F66 y el Footer #081521. No quedan grandes bloques blancos: la separación se logra alternando azules y bordes. Los valores globales se editan en src/styles/tokens.css. Las combinaciones principales de texto superan 4.5:1 de contraste calculado.

## Logo y redes integrados

Se incorporó el logo JPG original entregado por el cliente en public/images/branding/kaibo-logo.jpg. Navbar y Footer lo toman de siteConfig.logo. Al pie del Footer hay una franja con el logo y tres iconos Font Awesome: WhatsApp, TikTok e Instagram.

Los iconos se importan desde @fortawesome/free-brands-svg-icons y se renderizan mediante FontAwesomeIcon de @fortawesome/react-fontawesome. Se usa icon={faInstagram} (o su equivalente en el mapa de marcas) en lugar de fa-solid fa-file-import, que representa un archivo. Solo se importan los tres iconos necesarios. El CSS de Font Awesome se carga en layout.tsx y autoAddCss se desactiva siguiendo su integración con Next.js.

Los destinos proceden de los enlaces publicados en kaibosecurity.com: wa.me/56981935537, tiktok.com/@kaibosecurity e instagram.com/kaibosecurity. Se quitaron los parámetros de seguimiento de las redes. El número quedó centralizado en site.ts y los perfiles en social.ts; no se enviaron mensajes.

A petición del cliente se retiraron las leyendas visibles sobre generación de imágenes del Hero, Nosotros, cursos y Empresas. La procedencia de esos recursos se conserva en esta documentación interna. El favicon y los demás datos de contacto siguen pendientes. Validaciones: lint, TypeScript y build correctos; HTML compilado comprobado para confirmar el logo, los tres iconos y la ausencia de esas leyendas.

## Responsive, contacto y cursos — 24 de octubre de 2026

Se revisaron anchos CSS de 320, 390, 768, 1024 y 1440 px, además de otros anchos pequeños, sin desbordamiento horizontal de la página. Se comprobó el menú móvil, su cierre al navegar, los selectores de cursos, teclado Home, apertura/cierre del detalle y foco del panel. La consola no mostró avisos ni errores en esa revisión. No equivale a una prueba en todos los modelos físicos de celular.

El panel de Contacto reúne horario destacado, WhatsApp, correo y dirección. site.ts centraliza officeHours (lunes a viernes, 09:00–16:00), info@kaibosecurity.com y Serrano 73, Oficina 910, Santiago, según el sitio publicado. No se muestra un estado automático de abierto/cerrado. Todos los botones compartidos de WhatsApp usan faWhatsapp mediante FontAwesomeIcon.

Button.module.css define un brillo breve y respuesta al presionar. El movimiento respeta prefers-reduced-motion. Los tamaños de texto, márgenes y bloques flexibles se adaptan a espacios estrechos.

CoursesCarousel usa la misma lista: mazo con profundidad desde 64rem y scroll horizontal nativo por debajo. Las tarjetas traseras se pueden activar en sus zonas visibles o con teclado; los selectores numerados permiten elegir cualquier curso. Las flechas avanzan hasta los extremos. No hay reproducción automática. getDeckOffset calcula la posición relativa; los controles y el detalle conservan manejo del foco. Las tarjetas posteriores no exponen sus botones internos al teclado mientras están atrás.

Validación: Prettier, ESLint, TypeScript y build correctos; comprobación adicional de catálogo, imágenes, enlaces WhatsApp y HTML compilado aprobada. Se mantienen el formato vertical y comentarios de orientación en el código.


## Nosotros y equipo en un solo componente

About.tsx contiene ahora el texto de Nosotros, su botón, la galería, los contactos y el diálogo de las integrantes. About.module.css contiene todos sus estilos. Ya no se utilizan Team.tsx ni data/about.ts.

## Información comercial de cursos incorporada

Los datos enviados por el cliente se editan en src/features/landing/data/courses.ts. Guardia: $110.000 CLP, 90 horas en 12 días hábiles, online mixta, del 9 al 24 de noviembre de 2026. Conserje: $100.000 CLP, 60 horas en 8 días hábiles, online mixta, del 9 al 18 de noviembre de 2026. Ambos informan horario de lunes a viernes de 08:30 a 17:30. Bastón y Esposas: $50.000 CLP, presencial, 8 horas el 9 de noviembre de 2026, horario y lugar de capacitación por confirmar.

Los $40.000 CLP mencionados para acreditación se muestran separados del valor del curso. En Conserje, su aplicación se mantiene pendiente de confirmación. Las listas documentales, la advertencia sobre ClaveÚnica, las condiciones de Capacitaciones Desmar y la ausencia de credencial automática conservan las aclaraciones del material recibido. No se validaron como asesoría normativa ni se añadieron requisitos nuevos.

CourseDetails presenta modalidad, duración, precio, fechas y horario a la vista, con avisos visibles y apartados desplegables para pagos, documentación y servicios. sections permite añadir párrafos, listas y avisos sin editar el componente. registrationLabel cambia el texto del botón de inscripción. CCTV conserva su información anterior, sin valores, fechas ni modalidades inventados. La dirección de inscripción es un punto de atención, no se presenta como sede confirmada de Bastón y Esposas.

## Cursos: grilla y diálogo nativo

La sección usa ahora CoursesGrid/CoursesGrid.tsx y CoursesGrid.module.css. CourseCard es una tarjeta completa clicable y CourseDetails contiene el diálogo nativo, su bloqueo de scroll y su barra inferior fija. Se retiraron CoursesCarousel y utils/deck.ts. Los textos siguen en data/courses.ts. La documentación actual de esta etapa está en docs/CURSOS-MODAL.md.
