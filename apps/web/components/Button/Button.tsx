import { cx } from "class-variance-authority";
import { ButtonHTMLAttributes, FC } from "react";
import * as styles from "./styles";
import type { ButtonVariant } from "./styles";

type ButtonProps = ButtonVariant & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ className, intent, ...props }) => (
  <button {...props} className={cx(styles.button({ intent }), className)} />
);
