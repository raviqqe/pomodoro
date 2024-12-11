import { type JSX } from "react";
import { IoMdStats } from "react-icons/io";
import { useNavigate } from "react-router";
import { CircleButton } from "./CircleButton.js";

export const ViewGraphButton = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <CircleButton
      aria-label="View Graph"
      onClick={async () => navigate("/performance")}
      secondary
    >
      <IoMdStats />
    </CircleButton>
  );
};
