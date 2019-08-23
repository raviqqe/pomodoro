import { MdTimer } from "react-icons/md";
import React from "react";
import { CircleButton } from "./CircleButton";

interface IProps {
  viewTimer: () => void;
}

export const ViewTimer = ({ viewTimer }: IProps) => (
  <CircleButton secondary={true} onClick={viewTimer}>
    <MdTimer />
  </CircleButton>
);
