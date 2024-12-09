import { IoMdStats } from "react-icons/io";
import { CircleButton } from "./CircleButton.js";

interface Props {
  onClick: () => void;
}

export const ViewGraph = ({ onClick: viewGraph }: Props): JSX.Element => (
  <CircleButton aria-label="View Graph" onClick={viewGraph} secondary>
    <IoMdStats />
  </CircleButton>
);
