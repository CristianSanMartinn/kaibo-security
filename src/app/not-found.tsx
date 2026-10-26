import Link from "next/link";
import Container from "@/components/ui/Container/Container";

export default function NotFound() {
  return (
    <main
      id="contenido"
      tabIndex={-1}
    >
      <Container>
        <h1>Página no encontrada</h1>
        <p>La dirección que buscas no está disponible.</p>
        <Link href="/">Volver al inicio</Link>
      </Container>
    </main>
  );
}
