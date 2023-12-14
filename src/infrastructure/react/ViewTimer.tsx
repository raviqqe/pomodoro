import { MdTimer } from "react-icons/md/index.js";
import { CircleButton } from "./CircleButton.js";

interface Props {
  viewTimer: () => void;
}

export const ViewTimer = ({ viewTimer }: Props): JSX.Element => (
  <CircleButton aria-label="View Timer" onClick={viewTimer} secondary>
    <MdTimer />
  </CircleButton>
);
