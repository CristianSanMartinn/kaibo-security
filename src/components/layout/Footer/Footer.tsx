import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container/Container";
import SocialLinks from "@/components/ui/SocialLinks/SocialLinks";
import { siteConfig } from "@/config/site";
import { courses } from "@/features/landing/data/courses";
import styles from "./Footer.module.css";

// Año calculado al cargar el módulo: no introduce tiempo dinámico durante el render.
const copyrightYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.root}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.identity}>
            {/* Identidad de marca: logo primero, nombre y descripción debajo. */}
            {siteConfig.logo && (
              <Link
                href="/#inicio"
                className={styles.logo}
                aria-label="Kaibo Security, volver al inicio"
              >
                <Image
                  src={siteConfig.logo.src}
                  width={siteConfig.logo.width}
                  height={siteConfig.logo.height}
                  sizes="112px"
                  alt="Kaibo Security"
                />
              </Link>
            )}
            <p className={styles.companyName}>Kaibo Security</p>
            <p className={styles.description}>{siteConfig.description}</p>
          </div>
          <nav
            className={styles.column}
            aria-label="Cursos del pie de página"
          >
            <h2>Nuestros cursos</h2>
            {courses.map((course) => (
              <Link
                key={course.id}
                href="/#cursos"
              >
                {course.title}
              </Link>
            ))}
          </nav>
          <div className={styles.column}>
            <h2>Contacto</h2>
            {siteConfig.email && (
              <Link href={"mailto:" + siteConfig.email}>
                {siteConfig.email}
              </Link>
            )}
            {siteConfig.address && <p>{siteConfig.address}</p>}
            {siteConfig.hours && <p>{siteConfig.hours}</p>}
            <Link
              href="/#contacto"
              className={styles.contactLink}
            >
              Escríbenos
            </Link>
            <div className={styles.social}>
              <span className={styles.socialLabel}>Síguenos</span>
              <SocialLinks variant="brand" />
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>© {copyrightYear} Kaibo Security.</p>
          <Link href="/#inicio">Volver arriba ↑</Link>
        </div>
      </Container>
    </footer>
  );
}
