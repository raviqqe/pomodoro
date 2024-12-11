import { type JSX } from "react";
import { IoMdStats } from "react-icons/io";
import { useNavigate } from "react-router";
import { performanceGraphViewer } from "../../main/performance-graph-viewer.js";
import { CircleButton } from "./CircleButton.js";

export const ViewGraphButton = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <CircleButton
      aria-label="View Graph"
      onClick={async () => {
        await navigate("/performance");
        await performanceGraphViewer.viewGraph();
      }}
      secondary
    >
      <IoMdStats />
    </CircleButton>
  );
};
