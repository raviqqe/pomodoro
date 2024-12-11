import { type JSX } from "react";
import { MdTimer } from "react-icons/md";
import { useNavigate } from "react-router";
import { CircleButton } from "./CircleButton.js";

export const ViewTimerButton = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <CircleButton
      aria-label="View Timer"
      onClick={() => navigate("/timer")}
      secondary
    >
      <MdTimer />
    </CircleButton>
  );
};
