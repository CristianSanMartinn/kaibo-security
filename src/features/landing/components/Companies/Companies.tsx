// EMPRESAS: reemplaza textos e imagen cuando el cliente confirme su propuesta.
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container/Container";
import Button from "@/components/ui/Button/Button";
import styles from "./Companies.module.css";

export default function Companies() {
  return (
    <section
      id="empresas"
      tabIndex={-1}
      className={styles.root}
      aria-labelledby="companies-title"
    >
      <Container className={styles.grid}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>FORMACIÓN PARA ORGANIZACIONES</p>
          <h2 id="companies-title">
            Un equipo preparado empieza con una conversación.
          </h2>
          <p>
            Las necesidades de formación cambian según cada organización.
            Conversemos sobre tu equipo y las áreas de capacitación que te
            interesa desarrollar.
          </p>
          <div className={styles.steps}>
            <div>
              <span>01</span>
              <p>Cuéntanos qué necesita tu organización.</p>
            </div>
            <div>
              <span>02</span>
              <p>Consulta las alternativas de formación disponibles.</p>
            </div>
            <div>
              <span>03</span>
              <p>Revisa el alcance y las condiciones antes de coordinar.</p>
            </div>
          </div>
          <Button href="#contacto">
            Consultar para mi empresa
            <ArrowUpRight aria-hidden="true" />
          </Button>
        </div>
        <figure className={styles.figure}>
          <div className={styles.photo}>
            <Image
              src="/images/companies/equipo-provisional.webp"
              alt="Imagen ilustrativa de una reunión para conversar sobre capacitación de un equipo."
              fill
              sizes="(min-width: 64rem) 45vw, 100vw"
              loading="lazy"
              unoptimized
            />
          </div>
        </figure>
      </Container>
    </section>
  );
}
