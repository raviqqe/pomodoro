import classNames from "classnames";
import type { ComponentPropsWithoutRef, JSX } from "react";
import styles from "./Button.module.css";

interface Props extends ComponentPropsWithoutRef<"button"> {
  secondary?: boolean;
}

export const Button = ({
  className,
  secondary,
  ...props
}: Props): JSX.Element => (
  <button
    {...props}
    className={classNames(
      styles.button,
      secondary ? styles.secondary : undefined,
      className,
    )}
  />
);
