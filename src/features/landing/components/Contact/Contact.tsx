import {
  ArrowUpRight,
  Check,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

import Container from "@/components/ui/Container/Container";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { officeHours, siteConfig } from "@/config/site";
import { courses } from "../../data/courses";
import ContactForm from "../ContactForm/ContactForm";
import styles from "./Contact.module.css";

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(`${siteConfig.address}, Chile`);

const whatsappUrl =
  "https://wa.me/" +
  siteConfig.whatsapp.replace(/\D/g, "") +
  "?text=" +
  encodeURIComponent(
    "Hola Kaibo Security, quisiera solicitar información sobre sus capacitaciones.",
  );

export default function Contact() {
  return (
    <section
      id="contacto"
      tabIndex={-1}
      className={styles.root}
      aria-labelledby="contact-title"
    >
      <Container>
        <div className={styles.heading}>
          <SectionHeading
            eyebrow="CONTACTO"
            title="Hablemos sobre tu capacitación"
            id="contact-title"
          >
            <p>
              ¿Tienes dudas sobre nuestros cursos, próximas fechas o
              capacitación para empresas? Envíanos tu consulta y nuestro equipo
              se pondrá en contacto contigo.
            </p>
          </SectionHeading>

          <div
            className={styles.trustRow}
            aria-label="Información sobre nuestra atención"
          >
            <span>
              <Check size={16} aria-hidden="true" />
              Atención directa
            </span>

            <span>
              <Check size={16} aria-hidden="true" />
              Respuesta en horario laboral
            </span>
          </div>
        </div>

        <div className={styles.layout}>
          <ContactForm
            courses={courses.map((course) => course.title)}
          />

          <aside
            className={styles.infoPanel}
            aria-label="Información de contacto de Kaibo Security"
          >
            <div className={styles.infoHeader}>
              <span className={styles.infoEyebrow}>
                INFORMACIÓN DE CONTACTO
              </span>

              <h3>Estamos para orientarte</h3>

              <p>
                Si necesitas información sobre fechas, requisitos o
                capacitaciones, puedes comunicarte directamente con nuestro
                equipo.
              </p>
            </div>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <div className={styles.icon}>
                  <Clock3 size={21} aria-hidden="true" />
                </div>

                <div className={styles.infoContent}>
                  <span className={styles.label}>
                    Horario de atención
                  </span>

                  <strong>{officeHours.days}</strong>

                  <div
                    className={styles.hours}
                    aria-label={`De ${officeHours.opens} a ${officeHours.closes}`}
                  >
                    <time dateTime={officeHours.opens}>
                      {officeHours.opens}
                    </time>

                    <span>—</span>

                    <time dateTime={officeHours.closes}>
                      {officeHours.closes}
                    </time>
                  </div>

                  <p>Horario de Santiago de Chile.</p>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.infoItem}>
                <div className={styles.icon}>
                  <Mail size={21} aria-hidden="true" />
                </div>

                <div className={styles.infoContent}>
                  <span className={styles.label}>
                    Correo electrónico
                  </span>

                  <a
                    href={`mailto:${siteConfig.email}`}
                    className={styles.contactLink}
                  >
                    {siteConfig.email}
                  </a>

                  <p>
                    Para consultas generales y solicitudes de capacitación.
                  </p>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.infoItem}>
                <div className={styles.icon}>
                  <MapPin size={21} aria-hidden="true" />
                </div>

                <div className={styles.infoContent}>
                  <span className={styles.label}>
                    Nuestra oficina
                  </span>

                  <strong>{siteConfig.address}</strong>

                  <p>
                    Las visitas presenciales deben coordinarse previamente.
                  </p>

                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.inlineLink}
                  >
                    Cómo llegar
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            {/**
            <div className={styles.whatsapp}>
              <div>
                <strong>¿Necesitas atención más directa?</strong>

                <p>
                  También puedes escribirnos por WhatsApp.
                </p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} aria-hidden="true" />
                WhatsApp
              </a>
            </div>
             */}
          </aside>
        </div>
      </Container>
    </section>
  );
}