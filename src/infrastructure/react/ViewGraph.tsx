import { IoMdStats } from "react-icons/io";
import { CircleButton } from "./CircleButton";

interface IProps {
  viewGraph: () => void;
}

export const ViewGraph = ({ viewGraph }: IProps): JSX.Element => (
  <CircleButton aria-label="View Graph" onClick={viewGraph} secondary={true}>
    <IoMdStats />
  </CircleButton>
);
