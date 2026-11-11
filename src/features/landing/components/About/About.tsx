import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container/Container";
import Button from "@/components/ui/Button/Button";
import { siteConfig } from "@/config/site";
import styles from "./About.module.css";

// Presentación de la empresa. Los integrantes se editan en TeamShowcase.
export default function About() {
  return (
    <section
      id="nosotros"
      tabIndex={-1}
      aria-labelledby="about-title"
      className={styles.root}
    >
      <Container>
        <div className={styles.layout}>
          <div className={styles.brand}>
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              sizes="(min-width: 40rem) 240px, 160px"
              className={styles.logo}
            />
          </div>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>NOSOTROS</p>
            <h2 id="about-title">Somos Kaibo Security</h2>
            <p className={styles.intro}>
              Somos una OTEC que organiza capacitaciones en seguridad privada
              para personas y empresas en Chile.
            </p>
            <p className={styles.intro}>
              Cuando nos escribes, te responde alguien del equipo. Te contamos
              qué curso se ajusta a lo que buscas, sus modalidades y qué
              necesitas para inscribirte.
            </p>
            <Button
              href="#contacto"
              variant="outline"
              className={styles.action}
            >
              Contáctanos
              <ArrowUpRight
                size={18}
                aria-hidden="true"
              />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
