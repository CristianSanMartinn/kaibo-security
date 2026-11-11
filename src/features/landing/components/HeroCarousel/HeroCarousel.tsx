"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import HeroSlide from "../HeroSlide/HeroSlide";
import HeroMedia from "../HeroMedia/HeroMedia";
import type { HeroSlideData } from "../../types/hero.types";
import styles from "./HeroCarousel.module.css";

function subscribeVisibility(change: () => void) {
  document.addEventListener("visibilitychange", change);
  return () => document.removeEventListener("visibilitychange", change);
}

function visible() {
  return document.visibilityState === "visible";
}

type Props = {
  slides: HeroSlideData[];
  images: { src: string; objectPosition?: string }[];
  duration: number;
};

export default function HeroCarousel({ slides, images, duration }: Props) {
  // Una sola selección controla la fotografía, el texto, los botones y las barras.
  const [active, setActive] = useState(0);
  const [focused, setFocused] = useState(false);
  const pageVisible = useSyncExternalStore(
    subscribeVisibility,
    visible,
    () => false,
  );
  const count = Math.min(slides.length, images.length);
  const running = pageVisible && !focused && count > 1;

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, duration);
    return () => window.clearInterval(interval);
  }, [running, count, duration]);

  if (count === 0) return null;

  return (
    <div
      className={styles.root}
      aria-roledescription="carrusel"
      aria-label="Presentación de Kaibo Security"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <HeroMedia
        images={images.slice(0, count)}
        active={active}
      />
      <div className={styles.slides}>
        {slides.slice(0, count).map((slide, index) => (
          <HeroSlide
            key={slide.id}
            slide={slide}
            index={index}
            count={count}
            active={index === active}
          >
            {/* Barras discretas debajo de los botones; no son controles de navegación. */}
            <div
              className={styles.progress}
              data-running={running}
              aria-hidden="true"
              style={{ "--hero-duration": duration + "ms" } as CSSProperties}
            >
              {slides.slice(0, count).map((item, bar) => (
                <span
                  key={item.id}
                  className={styles.bar}
                  data-current={bar === active}
                  data-complete={bar < active}
                >
                  <span key={active + "-" + running} />
                </span>
              ))}
            </div>
          </HeroSlide>
        ))}
      </div>
    </div>
  );
}
