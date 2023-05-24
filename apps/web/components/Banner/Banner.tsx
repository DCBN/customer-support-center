import { cx } from "class-variance-authority";
import { FC, PropsWithChildren } from "react";
import { BannerStyleProps } from "./styles";
import * as styles from "./styles";

type BannerProps = PropsWithChildren<BannerStyleProps> & { className?: string };

export const Banner: FC<BannerProps> = ({ color, className, children }) => (
  <div className={cx(styles.banner({ color }), className)}>{children}</div>
);
