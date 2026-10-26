// BENEFICIOS: el contenido se administra en data/benefits.ts y los iconos se asignan aquí.
import { BookOpen, MessagesSquare, UsersRound } from "lucide-react";
import Container from "@/components/ui/Container/Container";
import { benefits } from "../../data/benefits";
import styles from "./Benefits.module.css";

const icons = { people: UsersRound, book: BookOpen, message: MessagesSquare };

export default function Benefits() {
  return (
    <section
      className={styles.root}
      aria-labelledby="benefits-title"
    >
      <Container>
        <div className={styles.heading}>
          <p>UNA DECISIÓN INFORMADA</p>
          <h2 id="benefits-title">Tu formación merece una buena elección.</h2>
        </div>
        <div className={styles.grid}>
          {benefits.map((benefit, index) => {
            const Icon = icons[benefit.icon];
            return (
              <article
                key={benefit.id}
                className={styles.item}
              >
                <div className={styles.top}>
                  <Icon
                    size={26}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span aria-hidden="true">0{index + 1}</span>
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
