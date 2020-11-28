import React from "react";
import { MdTimer } from "react-icons/md";
import { CircleButton } from "./CircleButton";

interface IProps {
  viewTimer: () => void;
}

export const ViewTimer = ({ viewTimer }: IProps): JSX.Element => (
  <CircleButton aria-label="View Timer" onClick={viewTimer} secondary={true}>
    <MdTimer />
  </CircleButton>
);
