import { permanentRedirect } from "next/navigation";

// Compatibilidad con enlaces compartidos antes de volver a una sola landing.
export default function AboutPage() {
  permanentRedirect("/#nosotros");
}
