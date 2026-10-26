import Image from "next/image";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Container from "@/components/ui/Container/Container";
import Button from "@/components/ui/Button/Button";
import { aboutContent } from "../../data/about";
import styles from "./About.module.css";

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
          <figure className={styles.figure}>
            <div className={styles.photoFrame}>
              <Image
                src={aboutContent.image.src}
                alt={aboutContent.image.alt}
                fill
                sizes="(min-width: 64rem) 45vw, 100vw"
                loading="lazy"
                unoptimized
                className={styles.photo}
              />
              <div
                className={styles.photoShade}
                aria-hidden="true"
              />
              <div className={styles.photoLabel}>
                <span className={styles.photoIcon}>
                  <BookOpen
                    size={22}
                    aria-hidden="true"
                  />
                </span>
                <span>Formación en seguridad privada</span>
              </div>
            </div>
          </figure>

          <div className={styles.panel}>
            <p className={styles.eyebrow}>
              <span aria-hidden="true" />
              {aboutContent.eyebrow}
            </p>
            <h2
              id="about-title"
              className={styles.title}
            >
              {aboutContent.title}
            </h2>
            <div className={styles.copy}>
              {aboutContent.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Button
              href={aboutContent.action.href}
              className={styles.action}
            >
              {aboutContent.action.label}
              <ArrowUpRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
