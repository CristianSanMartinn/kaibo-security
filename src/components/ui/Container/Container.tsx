import type { HTMLAttributes } from "react";
import styles from "./Container.module.css";

export default function Container({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[styles.root, className].join(" ")}
      {...props}
    />
  );
}
