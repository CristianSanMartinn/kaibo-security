// CIERRE: presenta la otra empresa del cliente y lleva a su sitio web.
// Logo proporcionado por el cliente; se muestra completo, sin recortes.
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container/Container";
import styles from "./FinalCTA.module.css";

/* EDITA AQUÍ: todo lo que se ve sale de este bloque. */
const firma = {
  name: "Firma Seguridad Company SpA",
  url: "https://firmaseguridad.cl",
  eyebrow: "Conoce también Firma Seguridad",
  title: "Seguridad que protege.",
  highlight: "Servicios que responden.",
  intro:
    "Servicios de seguridad privada, vigilancia y servicios operacionales para empresas, industrias, condominios e instalaciones críticas en Chile.",
  services: ["Seguridad", "Aseo", "Mantención", "Jardinería"],
  button: "Conocer sus servicios",
};

export default function FinalCTA() {
  return (
    <section
      className={styles.root}
      aria-labelledby="final-title"
    >
      <Container className={styles.inner}>
        {/* El logo es dorado sobre fondo negro, por eso va en un panel negro. */}
        <div className={styles.logo}>
          <Image
            src="/images/team/logo-firma-seguridad-company-spa.jpg"
            alt={"Logo de " + firma.name}
            width={1536}
            height={1024}
            sizes="(min-width: 48rem) 40vw, 90vw"
          />
        </div>

        <div className={styles.text}>
          <p className={styles.eyebrow}>{firma.eyebrow}</p>
          <h2 id="final-title">
            {firma.title}
            <span>{firma.highlight}</span>
          </h2>
          <p className={styles.intro}>{firma.intro}</p>

          <ul
            className={styles.services}
            aria-label="Servicios"
          >
            {firma.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>

          <a
            className={styles.button}
            href={firma.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {firma.button}
            <ArrowUpRight
              size={18}
              aria-hidden="true"
            />
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
          <span className={styles.destination}>firmaseguridad.cl</span>
        </div>
      </Container>
    </section>
  );
}
