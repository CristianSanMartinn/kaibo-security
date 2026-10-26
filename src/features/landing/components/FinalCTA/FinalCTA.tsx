// CIERRE: llamada a la acción que conduce al catálogo existente.
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container/Container";
import Button from "@/components/ui/Button/Button";
import styles from "./FinalCTA.module.css";

export default function FinalCTA() {
  return (
    <section
      className={styles.root}
      aria-labelledby="final-title"
    >
      <Container className={styles.inner}>
        <div>
          <p>TU PRÓXIMO PASO EMPIEZA CON INFORMACIÓN</p>
          <h2 id="final-title">Prepárate para seguir avanzando.</h2>
        </div>
        <Button
          href="#cursos"
          variant="primary"
        >
          Explorar capacitaciones
          <ArrowUpRight aria-hidden="true" />
        </Button>
      </Container>
    </section>
  );
}
