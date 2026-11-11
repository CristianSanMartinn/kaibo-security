"use client";

import Image from "next/image";
import styles from "./HeroMedia.module.css";

type Props = {
  images: { src: string; objectPosition?: string }[];
  active: number;
};

export default function HeroMedia({ images, active }: Props) {
  return (
    <>
      <div
        className={styles.background}
        aria-hidden="true"
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            className={styles.slide}
            data-active={index === active}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes="100vw"
              quality={95}
              fetchPriority={index === 0 ? "high" : "auto"}
              loading="eager"
              className={styles.image}
              style={{ objectPosition: image.objectPosition }}
            />
          </div>
        ))}
        <div className={styles.overlay} />
      </div>
    </>
  );
}
