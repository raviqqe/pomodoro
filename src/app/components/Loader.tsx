import { type JSX } from "react";
import { PulseLoader } from "react-spinners";
import { white } from "../../infrastructure/react/style/colors.js";

export const Loader = (): JSX.Element => (
  <PulseLoader color={white} style={{ display: "initial" }} />
);
