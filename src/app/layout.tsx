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
  title: { default: siteConfig.name, template: "%s | Kaibo Security" },
  description: siteConfig.description,
  robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
  ...(siteConfig.url ? { metadataBase: new URL(siteConfig.url) } : {}),
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "es_CL",
    siteName: siteConfig.name,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
        {/* Navbar y Footer se montan aquí una sola vez para todas las rutas. */}
        <Footer />
        <FloatingSocial />
      </body>
    </html>
  );
}
