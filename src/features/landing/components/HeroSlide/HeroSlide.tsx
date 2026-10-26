import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import Container from "@/components/ui/Container/Container";
import Button from "@/components/ui/Button/Button";
import WhatsAppButton from "@/components/ui/WhatsAppButton/WhatsAppButton";
import type { HeroSlideData } from "../../types/hero.types";
import styles from "./HeroSlide.module.css";

type Props = {
  slide: HeroSlideData;
  index: number;
  count: number;
  active: boolean;
};
export default function HeroSlide({ slide, index, count, active }: Props) {
  return (
    <div
      className={styles.root}
      data-active={active}
      aria-hidden={!active}
      inert={!active}
      role="group"
      aria-roledescription="diapositiva"
      aria-label={index + 1 + " de " + count + ": " + slide.label}
    >
      <Container className={styles.grid}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>
            <span aria-hidden="true" />
            {slide.eyebrow}
          </p>
          <h2>
            {slide.title}
            <br />
            <span>{slide.accent}</span>
          </h2>
          <p className={styles.description}>{slide.description}</p>
          <div className={styles.actions}>
            <Button href={slide.action.href}>
              {slide.action.label}
              <ArrowUpRight aria-hidden="true" />
            </Button>
            <WhatsAppButton
              label={slide.contactLabel}
              iconOnly
              className={styles.contactAction}
              variant="outline"
            />
          </div>
          {!siteConfig.whatsapp && (
            <p className={styles.contactNote}>
              WhatsApp se habilitará al confirmar el número oficial.
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
