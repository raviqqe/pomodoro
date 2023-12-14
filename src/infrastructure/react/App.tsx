import { styled } from "@linaria/react";
import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import { Home, type Props as HomeProps } from "./Home.js";
import { type Props as LandingProps, Landing } from "./Landing.js";
import { white } from "./style/colors.js";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export interface Props extends HomeProps, LandingProps {
  initialize: () => Promise<void>;
  signedIn: boolean | null;
}

export const App = ({
  initialize,
  repositoryUrl,
  signedIn,
  signIn,
  ...homeProps
}: Props): JSX.Element => {
  useAsync(initialize, []);

  return signedIn === null ? (
    <LoaderContainer>
      <PulseLoader color={white} />
    </LoaderContainer>
  ) : signedIn ? (
    <Home {...homeProps} />
  ) : (
    <Landing repositoryUrl={repositoryUrl} signIn={signIn} />
  );
};
