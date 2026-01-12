import classNames from "classnames";
import type { ComponentProps, JSX } from "react";
import { Button } from "./Button.js";
import styles from "./CircleButton.module.css";

type Props = ComponentProps<typeof Button>;

export const CircleButton = ({ className, ...props }: Props): JSX.Element => (
  <Button {...props} className={classNames(styles.circleButton, className)} />
);
