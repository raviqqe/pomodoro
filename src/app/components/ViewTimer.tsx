import { MdTimer } from "react-icons/md";
import { CircleButton } from "./CircleButton.js";

interface Props {
  onClick: () => void;
}

export const ViewTimer = ({ onClick: viewTimer }: Props): JSX.Element => (
  <CircleButton aria-label="View Timer" onClick={viewTimer} secondary>
    <MdTimer />
  </CircleButton>
);
