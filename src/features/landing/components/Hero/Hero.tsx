import HeroCarousel from "../HeroCarousel/HeroCarousel";
import { heroSlides, heroMedia } from "../../data/hero";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section
      id="inicio"
      tabIndex={-1}
      aria-labelledby="hero-title"
      className={styles.root}
    >
      <h1
        id="hero-title"
        className="sr-only"
      >
        Kaibo Security: formación en seguridad privada
      </h1>
      <div className={styles.foreground}>
        <HeroCarousel
          slides={heroSlides}
          images={heroMedia.images}
          duration={heroMedia.duration}
        />
      </div>
    </section>
  );
}
