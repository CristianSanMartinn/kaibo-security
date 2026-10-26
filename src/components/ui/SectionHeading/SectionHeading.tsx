import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type Props = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  id?: string;
};
export default function SectionHeading({
  eyebrow,
  title,
  children,
  id,
}: Props) {
  return (
    <div className={styles.root}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {children && <div className={styles.description}>{children}</div>}
    </div>
  );
}
