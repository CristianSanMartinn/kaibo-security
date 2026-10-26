import { Clock3, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Container from "@/components/ui/Container/Container";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import WhatsAppButton from "@/components/ui/WhatsAppButton/WhatsAppButton";
import SocialLinks from "@/components/ui/SocialLinks/SocialLinks";
import { siteConfig, officeHours } from "@/config/site";
import styles from "./Contact.module.css";

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
          eyebrow="CONTACTO DIRECTO"
          title="Hablemos. Aquí tienes cómo y cuándo."
          id="contact-title"
        >
          <p>
            Tu consulta, nuestros canales y el horario de atención: todo en un
            mismo lugar.
          </p>
        </SectionHeading>
        {/* Un panel compartido mantiene horario y contacto juntos en todos los anchos. */}
        <div className={styles.panel}>
          <div className={styles.schedule}>
            <span className={styles.label}>
              <Clock3
                size={20}
                aria-hidden="true"
              />
              HORARIO DE ATENCIÓN
            </span>
            <h3>{officeHours.days}</h3>
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
            <p>Horario de Santiago de Chile.</p>
            <small>
              Para una visita presencial, coordina previamente con nosotros.
            </small>
          </div>
          <div className={styles.direct}>
            <span className={styles.icon}>
              <FontAwesomeIcon
                icon={faWhatsapp}
                aria-hidden="true"
              />
            </span>
            <h3>Conversemos por WhatsApp</h3>
            <p>
              Consulta por cursos, requisitos o capacitación para tu empresa.
            </p>
            <WhatsAppButton
              label="Escribir por WhatsApp"
              className={styles.contactButton}
            />
            <span className={styles.contactHint}>
              Te orientamos durante nuestro horario de atención.
            </span>
          </div>
          <div className={styles.channels}>
            <div className={styles.channel}>
              <Mail
                size={21}
                aria-hidden="true"
              />
              <div>
                <h3>Correo electrónico</h3>
                <a href={"mailto:" + siteConfig.email}>
                  {siteConfig.email}
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
            <div className={styles.channel}>
              <MapPin
                size={21}
                aria-hidden="true"
              />
              <div>
                <h3>Encuéntranos</h3>
                <p>{siteConfig.address}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.social}>
          <p>También estamos en redes</p>
          <SocialLinks />
        </div>
      </Container>
    </section>
  );
}
