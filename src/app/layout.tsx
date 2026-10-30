import type { Metadata } from "next";
import type { ReactNode } from "react";

import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import FloatingSocial from "@/components/ui/FloatingSocial/FloatingSocial";

import { siteConfig } from "@/config/site";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import "./globals.css";

config.autoAddCss = false;

export const metadata: Metadata = {
  metadataBase: siteConfig.url
    ? new URL(siteConfig.url)
    : undefined,

  title: {
    default:
      "Kaibo Security | Cursos OS10 y Formación en Seguridad Privada",
    template: "%s | Kaibo Security",
  },

  description:
    "Cursos OS10 y capacitación profesional en seguridad privada para personas y empresas en Santiago de Chile.",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: siteConfig.indexable,
    follow: siteConfig.indexable,

    googleBot: {
      index: siteConfig.indexable,
      follow: siteConfig.indexable,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "es_CL",

    url: siteConfig.url ?? undefined,

    siteName: "Kaibo Security",

    title:
      "Kaibo Security | Formación en Seguridad Privada",

    description:
      "Cursos OS10 y capacitación profesional en seguridad privada para personas y empresas.",

    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Kaibo Security - Formación en Seguridad Privada",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Kaibo Security | Formación en Seguridad Privada",

    description:
      "Cursos OS10 y capacitación profesional en seguridad privada para personas y empresas.",

    images: ["/og.png"],
  },

  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es-CL">
      <body>
        <a
          href="#contenido"
          className="skip-link"
        >
          Saltar al contenido
        </a>

        <Navbar />

        {children}

        <Footer />

        <FloatingSocial />
      </body>
    </html>
  );
}