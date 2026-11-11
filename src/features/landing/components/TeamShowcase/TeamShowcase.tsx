import Image from "next/image";
import { Fragment } from "react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import styles from "./TeamShowcase.module.css";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  description?: string;
  phone?: string;
  email?: string;
};

// Equipo en orden de presentación. Confirmar nombres y orden con el cliente.
const members: TeamMember[] = [
  {
    id: "marco",
    name: "Marco Céspedes Cerda",
    role: "Representante legal",
    phone: "+56927650721",
    email: "kaibosecurity@gmail.com",
    description: "Representa a la OTEC y está a cargo de la dirección general.",
    image: "/images/team/marco-cespedes.webp",
  },
  {
    id: "carolyn",
    name: "Carolyn Acuña Meliviu",
    role: "Gerente general",
    phone: "+56942712966",
    email: "kaibosecurity@gmail.com",
    description: "Está a cargo de la gerencia general de Kaibo Security.",
    image: "/images/team/carolyn-acuna.webp",
  },
  {
    id: "camila",
    name: "Camila Andrea Céspedes Cerda",
    role: "Coordinadora general",
    phone: "+" + siteConfig.whatsapp,
    email: "kaibosecurity@gmail.com",
    description: "Está a cargo de la coordinación general de Kaibo Security.",
    image: "/images/team/camila-cespedes.webp",
  },
  {
    id: "jose",
    name: "José Antonio Díaz Espinoza",
    role: "Encargado SENCE",
    phone: "+56979363304",
    email: "Josecotediaz@gmail.com",
    description:
      "Asistente social, diplomado en Gestión Estratégica en Recursos Humanos.",
    image: "/images/team/jose-diaz.webp",
  },
  {
    id: "karla",
    name: "Karla Padilla Orellana",
    role: "Coordinadora",
    phone: "+56935586824",
    email: "kpadilla2810@gmail.com",
    description: "Es parte del equipo de coordinación de Kaibo Security.",
    image: "/images/team/karla-padilla.webp",
  },
];

const message = "Hola, quiero información sobre los cursos de Kaibo Security.";

export default function TeamShowcase() {
  return (
    <div className={styles.grid}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>KAIBO SECURITY</p>
        <h2 id="team-title">Nuestro equipo</h2>
        <span
          className={styles.rule}
          aria-hidden="true"
        />
        <p>
          Conoce a las personas que están detrás de Kaibo y comunícate
          directamente con el área que necesitas.
        </p>
      </header>

      {/* Cada integrante ocupa una tarjeta. Agrega sus datos al arreglo superior. */}
      {members.map((member, index) => {
        const phone = (member.phone || siteConfig.whatsapp).replace(/\D/g, "");
        const whatsapp =
          "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

        return (
          <Fragment key={member.id}>
            <article
              className={styles.card}
              aria-labelledby={"member-" + member.id}
            >
              <div className={styles.portrait}>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={640}
                  height={800}
                  sizes="(min-width: 64rem) 112px, (min-width: 40rem) 96px, 88px"
                />
              </div>
              <div className={styles.details}>
                <h3 id={"member-" + member.id}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                {member.description && (
                  <p className={styles.description}>{member.description}</p>
                )}
              </div>
              <div
                className={styles.actions}
                aria-label={"Contacto de " + member.name}
              >
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    "WhatsApp de " + member.name + " (abre una pestaña nueva)"
                  }
                  title="Escribir por WhatsApp"
                >
                  <MessageCircle
                    size={18}
                    aria-hidden="true"
                  />
                </a>
                {member.phone && (
                  <a
                    href={"tel:+" + phone}
                    aria-label={"Llamar a " + member.name}
                    title={member.phone}
                  >
                    <Phone
                      size={17}
                      aria-hidden="true"
                    />
                  </a>
                )}
                {member.email && (
                  <a
                    href={"mailto:" + member.email}
                    aria-label={"Enviar correo a " + member.name}
                    title={member.email}
                  >
                    <Mail
                      size={18}
                      aria-hidden="true"
                    />
                  </a>
                )}
              </div>
            </article>

            {/* Celdas editoriales: datos de Kaibo, sin estadísticas ni testimonios inventados. */}
            {index === 2 && (
              <aside className={styles.note}>
                <Users
                  size={26}
                  aria-hidden="true"
                />
                <h3>
                  Una consulta,
                  <br />
                  la persona indicada.
                </h3>
                <p>
                  Representación, coordinación y gestión SENCE en un mismo
                  equipo.
                </p>
              </aside>
            )}
            {index === 3 && (
              <aside className={styles.location}>
                <MapPin
                  size={26}
                  aria-hidden="true"
                />
                <p className={styles.eyebrow}>SANTIAGO, CHILE</p>
                <h3>Atención cercana.</h3>
                <p>{siteConfig.address}</p>
                <p className={styles.small}>
                  Las visitas presenciales deben coordinarse previamente.
                </p>
              </aside>
            )}
          </Fragment>
        );
      })}

      <a
        className={styles.contact}
        href="#contacto"
      >
        <p className={styles.eyebrow}>¿NO SABES A QUIÉN ESCRIBIR?</p>
        <h3>Cuéntanos qué necesitas.</h3>
        <p>Déjanos tu consulta en el formulario de contacto.</p>
        <span>
          Ir al formulario{" "}
          <ArrowUpRight
            size={18}
            aria-hidden="true"
          />
        </span>
      </a>
    </div>
  );
}
