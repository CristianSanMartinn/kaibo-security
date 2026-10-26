import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Button from "@/components/ui/Button/Button";
import { getWhatsAppUrl } from "@/config/site";
import styles from "./WhatsAppButton.module.css";

type Props = {
  label?: string;
  iconOnly?: boolean;
  message?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};
export default function WhatsAppButton({
  label = "Consultar por WhatsApp",
  iconOnly = false,
  message = "Hola, quiero información sobre Kaibo Security.",
  variant = "primary",
  className = "",
}: Props) {
  const href = getWhatsAppUrl(message);
  const content = (
    <>
      <FontAwesomeIcon
        icon={faWhatsapp}
        aria-hidden="true"
      />
      {!iconOnly && label}
    </>
  );
  const classes = [styles.root, className].join(" ");
  return href ? (
    <Button
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      className={classes}
      aria-label={label + " (abre una pestaña nueva)"}
    >
      {content}
    </Button>
  ) : (
    <Button
      disabled
      variant={variant}
      className={classes}
      title="Pendiente de confirmar el número oficial"
      aria-label={label + ": pendiente de confirmar el número oficial"}
    >
      {content}
    </Button>
  );
}
