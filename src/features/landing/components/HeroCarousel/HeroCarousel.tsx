import HeroSlide from "../HeroSlide/HeroSlide";
import type { HeroSlideData } from "../../types/hero.types";
import styles from "./HeroCarousel.module.css";

export default function HeroCarousel({ slides }: { slides: HeroSlideData[] }) {
  const slide = slides[0];

  if (!slide) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div className={styles.slides}>
        <HeroSlide
          slide={slide}
          index={0}
          count={1}
          active
        />
      </div>
    </div>
  );
}
