"use client";

// INSTALACIONES: galería y video del cliente.
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Expand, X } from "lucide-react";
import Container from "@/components/ui/Container/Container";
import styles from "./Benefits.module.css";

// FOTOS DEL CLIENTE: agrega o reemplaza las imágenes de instalaciones aquí.
const facilities = [
  {
    src: "/images/facilities/sala-principal.jpg",
    title: "Sala de clases",
    alt: "Sala de clases con sillas individuales, ventanas y proyector.",
  },
  {
    src: "/images/facilities/sala-vista-frontal.jpg",
    title: "Otro ángulo de la sala",
    alt: "Vista desde el frente de la sala, con filas de sillas y mesa para el relator.",
  },
  {
    src: "/images/facilities/zona-descanso.jpg",
    title: "Zona de descanso",
    alt: "Espacio de descanso con sillones y una mesa junto a las salas.",
  },
  {
    src: "/images/facilities/espacios-comunes.jpg",
    title: "Espacios comunes",
    alt: "Collage de los espacios comunes, con mesas, sillones y zona de microondas.",
  },
];

export default function Benefits() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const photoDialog = useRef<HTMLDialogElement>(null);
  const photoTrigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selectedPhoto === null) return;
    const dialog = photoDialog.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedPhoto]);

  return (
    <section
      id="beneficios"
      className={styles.root}
      aria-labelledby="facilities-title"
    >
      <Container>
        {/* Galería y video reales, dentro de Benefits para facilitar su mantenimiento. */}
        <div>
          <div className={styles.facilitiesHeading}>
            <span className={styles.eyebrow}>CONOCE KAIBO</span>
            <h2 id="facilities-title">Un vistazo a nuestros espacios</h2>
            <p>
              Conoce las salas de clases y los espacios comunes. Puedes ampliar
              cada fotografía para verla completa.
            </p>
          </div>

          <div className={styles.mediaLayout}>
            <div className={styles.gallery}>
              {facilities.map((photo, index) => (
                <figure
                  key={photo.src}
                  className={styles.galleryItem}
                >
                  <button
                    type="button"
                    className={styles.galleryButton}
                    aria-label={"Ampliar foto: " + photo.title}
                    aria-haspopup="dialog"
                    aria-controls="facilities-photo-dialog"
                    onClick={(event) => {
                      photoTrigger.current = event.currentTarget;
                      setSelectedPhoto(index);
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 100vw"
                    />
                    <span
                      className={styles.expandIcon}
                      aria-hidden="true"
                    >
                      <Expand size={17} />
                    </span>
                  </button>
                  <figcaption>{photo.title}</figcaption>
                </figure>
              ))}
            </div>

            <figure className={styles.videoCard}>
              {/* Sin autoplay: el visitante elige cuándo reproducir y escuchar. */}
              <video
                className={styles.presentationVideo}
                controls
                playsInline
                preload="none"
                poster="/images/facilities/video-presentacion.jpg"
                aria-label="Video de Kaibo Security"
              >
                <source
                  src="/videos/kaibo-presentacion.mp4"
                  type="video/mp4"
                />
                Tu navegador no puede reproducir este video.{" "}
                <a href="/videos/kaibo-presentacion.mp4">
                  Abrir video de Kaibo Security
                </a>
                .
              </video>
              <figcaption>
                <strong>Kaibo en video</strong>
                <span>Reproduce el video para conocernos un poco más.</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* El diálogo nativo admite Escape y devuelve el foco a la foto seleccionada. */}
        <dialog
          ref={photoDialog}
          id="facilities-photo-dialog"
          className={styles.photoDialog}
          aria-labelledby="facilities-photo-title"
          onClose={() => {
            setSelectedPhoto(null);
            photoTrigger.current?.focus();
          }}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return;
            const bounds = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < bounds.left ||
              event.clientX > bounds.right ||
              event.clientY < bounds.top ||
              event.clientY > bounds.bottom
            ) {
              event.currentTarget.close();
            }
          }}
        >
          {selectedPhoto !== null && (
            <>
              <div className={styles.dialogHeader}>
                <h3 id="facilities-photo-title">
                  {facilities[selectedPhoto].title}
                </h3>
                <button
                  type="button"
                  autoFocus
                  aria-label="Cerrar fotografía"
                  onClick={() => photoDialog.current?.close()}
                >
                  <X
                    size={22}
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className={styles.fullPhoto}>
                <Image
                  src={facilities[selectedPhoto].src}
                  alt={facilities[selectedPhoto].alt}
                  fill
                  sizes="(min-width: 64rem) 960px, 95vw"
                />
              </div>
            </>
          )}
        </dialog>
      </Container>
    </section>
  );
}
