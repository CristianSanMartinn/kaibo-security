import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";
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

export default function About() {
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
                <MessageCircle size={18} aria-hidden="true" />
                Escríbenos por WhatsApp
              </a>
              <ul className={styles.contactList}>
                <li>
                  <a href={"mailto:" + contact.email}>
                    <Mail size={16} aria-hidden="true" />
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a href={"tel:" + contact.phone}>
                    <Phone size={16} aria-hidden="true" />
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
                {member.name && (
                  <p className={styles.role}>{member.role}</p>
                )}
                <p className={styles.does}>{member.does}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}