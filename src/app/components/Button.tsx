import classNames from "classnames";
import type { ComponentPropsWithoutRef, JSX } from "react";
import styles from "./Button.module.css";

type Props = ComponentPropsWithoutRef<"button"> & {
  secondary?: boolean;
};

export const Button = ({
  secondary,
  className,
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
