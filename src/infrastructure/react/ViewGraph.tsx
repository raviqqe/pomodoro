import { IoMdStats } from "react-icons/io";
import { CircleButton } from "./CircleButton.js";

interface Props {
  viewGraph: () => void;
}

export const ViewGraph = ({ viewGraph }: Props): JSX.Element => (
  <CircleButton aria-label="View Graph" onClick={viewGraph} secondary>
    <IoMdStats />
  </CircleButton>
);
