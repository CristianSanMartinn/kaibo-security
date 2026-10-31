import Image from "next/image";
import { ArrowDownRight, Mail, Phone } from "lucide-react";
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
  phone: string;
  email: string;
  does: string;
  image: string;
};

// Completa name en las tres fichas pendientes. Cada contacto puede editarse por separado.
const members: Member[] = [
  {
    name: "Marco Céspedes Cerda",
    role: "Representante legal",
    phone: contact.phone,
    email: contact.email,
    does: "Representa a la OTEC y está a cargo de la dirección general.",
    image: "/images/team/perfil-1.webp",
  },
  {
    name: "", // Agrega aquí el nombre completo.
    role: "Coordinación académica",
    phone: contact.phone,
    email: contact.email,
    does: "Organiza los cursos, las fechas y a los relatores.",
    image: "/images/team/perfil-2.jfif",
  },
  {
    name: "", // Agrega aquí el nombre completo.
    role: "Atención y admisiones",
    phone: contact.phone,
    email: contact.email,
    does: "Responde consultas y ayuda con las inscripciones.",
    image: "/images/team/perfil-3.jpg",
  },
  {
    name: "", // Agrega aquí el nombre completo.
    role: "Administración",
    phone: contact.phone,
    email: contact.email,
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
                className={styles.formLink}
                href="#contacto"
              >
                <ArrowDownRight
                  size={18}
                  aria-hidden="true"
                />
                Ir al formulario de contacto
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
                alt={member.name || member.role}
                width={160}
                height={160}
              />
              <div className={styles.memberInfo}>
                <h3>{member.name || "Nombre por confirmar"}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.does}>
                  <span className={styles.areaLabel}>Qué hace en su área</span>
                  {member.does}
                </p>
                {/* Contactos de empresa: se pueden pulsar para llamar o escribir. */}
                <div className={styles.memberContact}>
                  <a href={"tel:" + member.phone}>
                    <Phone
                      size={16}
                      aria-hidden="true"
                    />
                    <span>
                      <span className={styles.contactLabel}>
                        Teléfono de empresa
                      </span>
                      {member.phone}
                    </span>
                  </a>
                  <a href={"mailto:" + member.email}>
                    <Mail
                      size={16}
                      aria-hidden="true"
                    />
                    <span>
                      <span className={styles.contactLabel}>
                        Correo electrónico
                      </span>
                      {member.email}
                    </span>
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
