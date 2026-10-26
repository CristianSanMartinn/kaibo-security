import { Plus } from "lucide-react";
import Container from "@/components/ui/Container/Container";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import { frequentlyAskedQuestions } from "../../data/faq";
import styles from "./FAQ.module.css";

export default function FAQ() {
  return (
    <section
      className={styles.root}
      aria-labelledby="faq-title"
    >
      <Container className={styles.grid}>
        <SectionHeading
          eyebrow="ANTES DE DAR EL SIGUIENTE PASO"
          title="Resolvamos tus dudas."
          id="faq-title"
        >
          <p>
            Información que conviene revisar antes de elegir una capacitación.
          </p>
        </SectionHeading>
        <div className={styles.items}>
          {/* details/summary ofrece teclado y estado abierto/cerrado sin JavaScript. */}
          {frequentlyAskedQuestions.map((item) => (
            <details
              key={item.question}
              className={styles.item}
            >
              <summary>
                {item.question}
                <Plus
                  size={18}
                  aria-hidden="true"
                />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
