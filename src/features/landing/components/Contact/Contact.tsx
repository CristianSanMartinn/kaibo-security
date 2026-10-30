import { ArrowUpRight, Clock3, Mail, MapPin } from "lucide-react";
import Container from "@/components/ui/Container/Container";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import SocialLinks from "@/components/ui/SocialLinks/SocialLinks";
import { siteConfig, officeHours } from "@/config/site";
import { courses } from "../../data/courses";
import ContactForm from "../ContactForm/ContactForm";
import styles from "./Contact.module.css";

// La ubicación y los canales se actualizan desde src/config/site.ts.
const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(siteConfig.address + ", Chile");

export default function Contact() {
  return (
    <section
      id="contacto"
      tabIndex={-1}
      className={styles.root}
      aria-labelledby="contact-title"
    >
      <Container>
        <SectionHeading
          eyebrow="CONTACTO"
          title="Cuéntanos qué necesitas."
          id="contact-title"
        >
          <p>
            Completa el formulario y te respondemos en nuestro horario de
            atención.
          </p>
        </SectionHeading>
        <div className={styles.layout}>
          {/* El formulario recibe solo los títulos, sin cargar el detalle de los cursos. */}
          <ContactForm
            courses={courses.map((course) => course.title)}
            whatsapp={siteConfig.whatsapp}
          />
          <aside
            className={styles.side}
            aria-label="Horario, correo y ubicación"
          >
            <div className={styles.card}>
              <span className={styles.label}>
                <Clock3
                  size={20}
                  aria-hidden="true"
                />
                Horario de atención
              </span>
              <p className={styles.days}>{officeHours.days}</p>
              <div
                className={styles.hours}
                aria-label={
                  "De " + officeHours.opens + " a " + officeHours.closes
                }
              >
                <time dateTime={officeHours.opens}>{officeHours.opens}</time>
                <span>a</span>
                <time dateTime={officeHours.closes}>{officeHours.closes}</time>
              </div>
              <p className={styles.note}>
                Horario de Santiago de Chile. Para una visita presencial,
                coordina previamente con nosotros.
              </p>
            </div>
            <div className={styles.card}>
              <span className={styles.label}>
                <Mail
                  size={20}
                  aria-hidden="true"
                />
                Correo
              </span>
              <a
                className={styles.email}
                href={"mailto:" + siteConfig.email}
              >
                {siteConfig.email}
              </a>
            </div>
            <a
              className={styles.location}
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin
                size={28}
                aria-hidden="true"
              />
              <span className={styles.locationText}>
                <strong>Nuestra oficina</strong>
                <span>{siteConfig.address}</span>
              </span>
              <span className={styles.locationCta}>
                Cómo llegar
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                />
                <span className="sr-only">
                  {" "}
                  (abre Google Maps en una pestaña nueva)
                </span>
              </span>
            </a>
            {/**
              <div className={styles.social}>
                <p>También estamos en redes</p>
                <SocialLinks />
              </div>
            */}
          </aside>
        </div>
      </Container>
    </section>
  );
}
