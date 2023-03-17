import { MdTimer } from "react-icons/md/index.js";
import { CircleButton } from "./CircleButton.js";

interface IProps {
  viewTimer: () => void;
}

export const ViewTimer = ({ viewTimer }: IProps): JSX.Element => (
  <CircleButton aria-label="View Timer" onClick={viewTimer} secondary>
    <MdTimer />
  </CircleButton>
);
