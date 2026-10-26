import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faWhatsapp, faTiktok, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { socialLinks } from "@/config/social";
import styles from "./SocialLinks.module.css";

// Importamos solo tres iconos, en lugar de registrar todo el catálogo de marcas.
const icons = {
  whatsapp: faWhatsapp,
  tiktok: faTiktok,
  instagram: faInstagram,
};

export default function SocialLinks() {
  const links = socialLinks.filter((item) => /^https:\/\//.test(item.href));
  if (!links.length) return null;

  return (
    <ul
      className={styles.root}
      aria-label="Redes sociales oficiales"
    >
      {links.map((item) => (
        <li key={item.platform}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label + " (abre una pestaña nueva)"}
            title={item.label}
          >
            <FontAwesomeIcon
              icon={icons[item.platform]}
              aria-hidden="true"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
