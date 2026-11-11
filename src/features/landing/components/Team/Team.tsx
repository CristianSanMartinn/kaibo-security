import Container from "@/components/ui/Container/Container";
import TeamShowcase from "../TeamShowcase/TeamShowcase";
import styles from "./Team.module.css";

// Sección independiente: conserva el selector y las fichas del equipo.
export default function Team() {
  return (
    <section
      id="equipo"
      tabIndex={-1}
      aria-labelledby="team-title"
      className={styles.root}
    >
      <Container>
        <TeamShowcase />
      </Container>
    </section>
  );
}
