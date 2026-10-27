"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faTiktok,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { socialLinks } from "@/config/social";
import styles from "./FloatingSocial.module.css";

const icons = {
  whatsapp: faWhatsapp,
  instagram: faInstagram,
  tiktok: faTiktok,
};

// Los destinos se mantienen en config/social.ts; WhatsApp usa config/site.ts.
const links = socialLinks.filter((link) => /^https:\/\//.test(link.href));
const ROTATION_MS = 2800;

export default function FloatingSocial() {
  const [index, setIndex] = useState(0);
  const hovered = useRef(false);
  const focused = useRef(false);

  useEffect(() => {
    if (links.length < 2) return;

    const timer = window.setInterval(() => {
      // No cambiamos el destino mientras alguien está interactuando con él.
      // Reducir movimiento elimina la animación CSS, pero permite alternar redes.
      if (hovered.current || focused.current || document.hidden) {
        return;
      }

      setIndex((current) => (current + 1) % links.length);
    }, ROTATION_MS);

    return () => window.clearInterval(timer);
  }, []);

  if (!links.length) return null;

  return (
    <aside
      className={styles.root}
      aria-label="Contacto rápido y redes sociales"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") hovered.current = true;
      }}
      onPointerLeave={() => (hovered.current = false)}
      onFocusCapture={(event) => {
        focused.current = event.target.matches(":focus-visible");
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          focused.current = false;
        }
      }}
    >
      <div className={styles.track}>
        {links.map((link, position) => (
          <a
            key={link.platform}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label + " (abre una pestaña nueva)"}
            aria-hidden={position !== index}
            tabIndex={position === index ? 0 : -1}
            className={[
              styles.fab,
              styles[link.platform],
              position === index ? styles.active : "",
            ].join(" ")}
          >
            <FontAwesomeIcon
              icon={icons[link.platform]}
              aria-hidden="true"
              className={styles.icon}
            />
            <span className={styles.tooltip}>{link.label}</span>
          </a>
        ))}
      </div>

      {links.length > 1 && (
        <div className={styles.controls}>
          {links.map((link, position) => (
            <button
              key={link.platform}
              type="button"
              className={styles.dot}
              aria-label={"Ver " + link.label}
              aria-pressed={position === index}
              onClick={() => setIndex(position)}
            >
              <span aria-hidden="true" />
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}
