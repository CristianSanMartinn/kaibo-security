import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Shared = {
  variant?: "primary" | "secondary" | "outline";
  className?: string;
};
type ButtonProps = Shared &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: never } & ButtonHTMLAttributes<HTMLButtonElement>)
  );

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = [styles.root, styles[variant], className].join(" ");
  if (typeof props.href === "string") {
    return (
      <a
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }
  const { type = "button", ...buttonProps } =
    props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={type}
      className={classes}
      {...buttonProps}
    />
  );
}
