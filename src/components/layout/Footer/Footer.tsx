import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container/Container";
import SocialLinks from "@/components/ui/SocialLinks/SocialLinks";
import { siteConfig } from "@/config/site";
import { navigation } from "@/config/navigation";
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
            <p className={styles.companyName}>Kaibo Security</p>
            <p>{siteConfig.description}</p>
          </div>
          <div className={styles.column}>
            <h2>Explora</h2>
            <nav aria-label="Navegación del pie de página">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={"/" + item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className={styles.column}>
            <h2>Capacitaciones</h2>
            {courses.map((course) => (
              <Link
                key={course.id}
                href="/#cursos"
              >
                {course.title}
              </Link>
            ))}
          </div>
          <div className={styles.column}>
            <h2>Contacto</h2>
            {siteConfig.email && (
              <Link href={"mailto:" + siteConfig.email}>
                {siteConfig.email}
              </Link>
            )}
            {siteConfig.address && <p>{siteConfig.address}</p>}
            {siteConfig.hours && <p>{siteConfig.hours}</p>}
            <Link href="/#contacto">Ver canales de atención</Link>
          </div>
        </div>
        {/* Franja de marca y redes al pie del Footer, antes del copyright. */}
        <div className={styles.socialStrip}>
          {siteConfig.logo && (
            <Link
              href="/#inicio"
              className={styles.bottomLogo}
              aria-label="Kaibo Security, volver al inicio"
            >
              <Image
                src={siteConfig.logo.src}
                width={siteConfig.logo.width}
                height={siteConfig.logo.height}
                alt="Kaibo Security"
                unoptimized
              />
            </Link>
          )}
          <SocialLinks />
        </div>
        <div className={styles.bottom}>
          <p>© {copyrightYear} Kaibo Security.</p>
          <Link href="/#inicio">Volver arriba ↑</Link>
        </div>
      </Container>
    </footer>
  );
}
