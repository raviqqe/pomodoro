import { IoMdStats } from "react-icons/io";
import React from "react";
import { CircleButton } from "./CircleButton";

interface IProps {
  viewGraph: () => void;
}

export const ViewGraph = ({ viewGraph }: IProps) => (
  <CircleButton onClick={viewGraph} secondary={true}>
    <IoMdStats />
  </CircleButton>
);
