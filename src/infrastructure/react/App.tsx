import { styled } from "@linaria/react";
import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import { Home, type Props as HomeProps } from "./Home.js";
import { Landing } from "./Landing.js";
import { white } from "./style/colors.js";
import { applicationInitializer } from "../../main/application-initializer.js";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export interface Props extends HomeProps {
  signedIn: boolean | null;
}

export const App = ({ signedIn, ...homeProps }: Props): JSX.Element => {
  useAsync(() => applicationInitializer.initialize(), []);

  return signedIn === null ? (
    <LoaderContainer>
      <PulseLoader color={white} />
    </LoaderContainer>
  ) : signedIn ? (
    <Home {...homeProps} />
  ) : (
    <Landing />
  );
};
