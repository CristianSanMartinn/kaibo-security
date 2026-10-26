"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navigation } from "@/config/navigation";
import WhatsAppButton from "@/components/ui/WhatsAppButton/WhatsAppButton";
import styles from "./MobileMenu.module.css";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target))
        setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  function navigate(href: string) {
    setOpen(false);
    requestAnimationFrame(() =>
      document.getElementById(href.slice(1))?.focus({ preventScroll: true }),
    );
  }

  return (
    <div
      className={styles.root}
      ref={root}
      onBlur={(event) => {
        if (
          event.relatedTarget instanceof Node &&
          !event.currentTarget.contains(event.relatedTarget)
        )
          setOpen(false);
      }}
    >
      <button
        ref={trigger}
        className={styles.toggle}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav
        id="mobile-navigation"
        className={styles.panel}
        hidden={!open}
        aria-label="Navegación móvil"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={"/" + item.href}
            onClick={() => navigate(item.href)}
          >
            {item.label}
            <ArrowUpRight
              size={16}
              aria-hidden="true"
            />
          </Link>
        ))}
        <div className={styles.contact}>
          <WhatsAppButton label="WhatsApp" />
          {!siteConfig.whatsapp && (
            <p>Número oficial pendiente de confirmar.</p>
          )}
        </div>
      </nav>
    </div>
  );
}
