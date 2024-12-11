import { MdTimer } from "react-icons/md";
import { CircleButton } from "./CircleButton.js";
import { useNavigate } from "react-router";
import { type JSX } from "react";

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
