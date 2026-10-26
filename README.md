# Kaibo Security

Landing corporativa local con Next.js App Router, React, TypeScript, CSS Modules y Lucide React. Gestor de paquetes: pnpm. Código organizado por componentes, contenido configurable y comentarios de mantenimiento.

## Iniciar

```sh
pnpm install
pnpm dev
```

## Validar

```sh
pnpm format
pnpm format:check
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Secciones implementadas

Navbar y menú móvil, Hero con fondo completo y portada fija, Nosotros con borde luminoso, beneficios, carrusel de cursos y panel de detalle, Empresas, preguntas frecuentes, contacto sin formulario, cierre y Footer.

Los controles del Hero fueron retirados por decisión de diseño. El carrusel de cursos es manual y utiliza scroll nativo. Los formularios, pagos, autenticación y backend no forman parte del proyecto.

## Guía de edición

Lee [docs/MANTENIMIENTO.md](docs/MANTENIMIENTO.md). Incluye un mapa de archivos, instrucciones para cambiar contenido e imágenes, añadir cursos, activar WhatsApp, configurar el video y modificar el efecto de luz.

## Contenido pendiente

La versión conserva el aviso de revisión. Logo y favicon originales, contactos, redes, oferta, precios, duración, modalidad, temarios, requisitos y fechas requieren confirmación. Los campos vacíos no generan datos inventados. La lista central está en src/config/pending.ts.

Las fotografías actuales son ilustrativas generadas con IA. Se sirven versiones WebP optimizadas; los PNG originales se conservan. El video real del Hero todavía no se ha entregado.

## SEO y publicación

La indexación está desactivada por defecto. Antes de publicar, aprobar el contenido y configurar NEXT_PUBLIC_SITE_URL y NEXT_PUBLIC_SITE_INDEXABLE=true en el entorno final. La configuración actual prerenderiza la página; output: export requiere revisar las opciones de Next.js y el hosting antes de activarlo.

No se han hecho commits, push ni despliegues. La revisión visual final en navegador queda pendiente por un bloqueo de acceso de la herramienta.

## Paleta oscura de Kaibo

Se aplicaron los colores de los estilos del sitio original: azul marino #0D2138, azul secundario #122E4E, amarillo #F4B41A y texto claro #D9E2EC. Las tarjetas elevadas usan #1B3F66 y el Footer #081521. No quedan grandes bloques blancos: la separación se logra alternando azules y bordes. Los valores globales se editan en src/styles/tokens.css. Las combinaciones principales de texto superan 4.5:1 de contraste calculado.
