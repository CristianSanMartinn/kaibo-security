import Container from "@/components/ui/Container/Container";
import Hero from "../Hero/Hero";
import About from "../About/About";
import Benefits from "../Benefits/Benefits";
import Courses from "../Courses/Courses";
import Companies from "../Companies/Companies";
import FAQ from "../FAQ/FAQ";
import Contact from "../Contact/Contact";
import FinalCTA from "../FinalCTA/FinalCTA";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <main
      id="contenido"
      tabIndex={-1}
    >
      <div className={styles.review}>
        <Container>
          <span>VERSIÓN DE REVISIÓN</span>Textos, imágenes, oferta y contactos
          pendientes de aprobación.
        </Container>
      </div>
      {/* ORDEN DE LA PÁGINA: cambia este orden para reorganizar las secciones. */}
      <Hero />
      <About />
      <Benefits />
      <Courses />
      <Companies />
      <FAQ />
      <Contact />
      <FinalCTA />
    </main>
  );
}
