"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Expand, Mail, MessageCircle, Phone, X } from "lucide-react";
import Container from "@/components/ui/Container/Container";
import styles from "./About.module.css";

/*
  EDITA AQUÍ con tus propias palabras. Todo lo que se ve en la sección sale de
  este bloque, así que no necesitas tocar el JSX.
  Fotos: public/images/team/. Cuando tengas fotos reales, cambia las rutas
  y el texto alternativo.
*/
const contact = {
  email: "contacto@mifirmaseguridad.com",
  phone: "+56927650721",
  whatsapp: "56927650721",
  hours: "Respondemos de lunes a viernes.", // ajusta el horario real
};

const intro = {
  title: "Somos Kaibo Security",
  paragraphs: [
    "Somos una OTEC que organiza capacitaciones en seguridad privada para personas y empresas.",
    "Cuando nos escribes, te responde alguien del equipo. Te contamos qué curso te conviene, cuándo parte y qué necesitas para inscribirte.",
  ],
};

const team = {
  photo: "/images/team/equipo-ilustrativo.webp",
  alt: "El equipo de Kaibo Security",
  caption: "Parte del equipo de Kaibo Security",
};

type Member = {
  name?: string;
  role: string;
  does: string;
  image: string;
};

const members: Member[] = [
  {
    name: "Marco Céspedes Cerda",
    role: "Representante legal",
    does: "Representa a la OTEC y está a cargo de la dirección general.",
    image: "/images/team/perfil-1.webp",
  },
  {
    role: "Coordinación académica",
    does: "Organiza los cursos, las fechas y a los relatores.",
    image: "/images/team/perfil-2.jfif",
  },
  {
    role: "Atención y admisiones",
    does: "Responde consultas y ayuda con las inscripciones.",
    image: "/images/team/perfil-3.jpg",
  },
  {
    role: "Administración",
    does: "Se encarga de la documentación, facturas y certificados.",
    image: "/images/team/perfil-4.jpg",
  },
];

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

export default function About() {
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
      id="nosotros"
      tabIndex={-1}
      aria-labelledby="about-title"
      className={styles.root}
    >
      <Container>
        <div className={styles.top}>
          <div className={styles.text}>
            <h2 id="about-title">{intro.title}</h2>
            {intro.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}

            <div className={styles.contact}>
              <a
                className={styles.whatsapp}
                href={"https://wa.me/" + contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle
                  size={18}
                  aria-hidden="true"
                />
                Escríbenos por WhatsApp
              </a>
              <ul className={styles.contactList}>
                <li>
                  <a href={"mailto:" + contact.email}>
                    <Mail
                      size={16}
                      aria-hidden="true"
                    />
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a href={"tel:" + contact.phone}>
                    <Phone
                      size={16}
                      aria-hidden="true"
                    />
                    {contact.phone}
                  </a>
                </li>
              </ul>
              <p className={styles.hours}>{contact.hours}</p>
            </div>
          </div>

          <figure className={styles.photo}>
            <div className={styles.photoFrame}>
              <Image
                src={team.photo}
                alt={team.alt}
                fill
                sizes="(min-width: 64rem) 55vw, 100vw"
              />
            </div>
            <figcaption>{team.caption}</figcaption>
          </figure>
        </div>

        <ul className={styles.team}>
          {members.map((member) => (
            <li key={member.role}>
              <Image
                className={styles.avatar}
                src={member.image}
                alt={member.name ?? member.role}
                width={160}
                height={160}
              />
              <div>
                <h3>{member.name ?? member.role}</h3>
                {member.name && <p className={styles.role}>{member.role}</p>}
                <p className={styles.does}>{member.does}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Galería y video reales, dentro de Nosotros para facilitar su mantenimiento. */}
        <section
          className={styles.facilities}
          aria-labelledby="facilities-title"
        >
          <div className={styles.facilitiesHeading}>
            <span className={styles.eyebrow}>CONOCE KAIBO</span>
            <h3 id="facilities-title">Un vistazo a nuestros espacios</h3>
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
        </section>

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
