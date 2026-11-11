"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import styles from "./FacilitiesSlideshow.module.css";

// Añade las fotos de salas aquí. El tamaño del marco se mantiene al cambiar.
const photos = [
  {
    src: "/images/facilities/sala-principal.jpg",
    alt: "Sala de capacitación con sillas individuales, ventanas y proyector.",
  },
  {
    src: "/images/facilities/sala-vista-frontal.jpg",
    alt: "Vista frontal de la sala de capacitación con filas de sillas y mesa del relator.",
  },
];

export default function FacilitiesSlideshow() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => {
      if (!document.hidden)
        setActive((current) => (current + 1) % photos.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [playing]);

  return (
    <figure
      className={styles.root}
      aria-label="Fotografías de nuestras salas"
    >
      <div className={styles.frame}>
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            className={styles.slide}
            data-active={active === index}
            aria-hidden={active !== index}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 64rem) 42vw, 92vw"
              loading="eager"
            />
          </div>
        ))}
      </div>
      <figcaption className={styles.caption}>
        <span>Espacios para la capacitación</span>
        <div className={styles.controls}>
          <div
            className={styles.dots}
            role="group"
            aria-label="Elegir fotografía de la sala"
          >
            {photos.map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                aria-label={"Ver fotografía " + (index + 1)}
                aria-pressed={active === index}
                onClick={() => {
                  setActive(index);
                  setPlaying(false);
                }}
                className={styles.dot}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
          <button
            type="button"
            className={styles.playback}
            aria-label={
              playing
                ? "Pausar cambio de fotografías"
                : "Reanudar cambio de fotografías"
            }
            onClick={() => setPlaying((current) => !current)}
          >
            {playing ? (
              <Pause
                size={16}
                aria-hidden="true"
              />
            ) : (
              <Play
                size={16}
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </figcaption>
    </figure>
  );
}
