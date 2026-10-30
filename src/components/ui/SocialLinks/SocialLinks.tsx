import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faTiktok, faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { socialLinks } from "@/config/social";
import styles from "./SocialLinks.module.css";

// Importamos solo tres iconos, en lugar de registrar todo el catálogo de marcas.
const icons = {
  whatsapp: faWhatsapp,
  tiktok: faTiktok,
  instagram: faInstagram,
  facebook: faFacebook,
};

// El footer usa colores de marca; otros lugares conservan la variante original.
export default function SocialLinks({
  variant = "default",
}: {
  variant?: "default" | "brand";
}) {
  const links = socialLinks.filter((item) => /^https:\/\//.test(item.href));
  if (!links.length) return null;

  return (
    <ul
      className={[styles.root, variant === "brand" ? styles.brand : ""].join(
        " ",
      )}
      aria-label="Redes sociales oficiales"
    >
      {links.map((item) => (
        <li key={item.platform}>
          <a
            className={styles[item.platform]}
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
