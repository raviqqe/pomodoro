import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import styled from "styled-components";
import { Home, IProps as IHomeProps } from "./Home";
import { IProps as ILandingProps, Landing } from "./Landing";
import { white } from "./style/colors";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export interface IProps extends IHomeProps, ILandingProps {
  initialize: () => Promise<void>;
  signedIn: boolean | null;
}

export const App = ({
  initialize,
  repositoryURL,
  signedIn,
  signIn,
  ...homeProps
}: IProps): JSX.Element => {
  useAsync(initialize, []);

  return signedIn === null ? (
    <LoaderContainer>
      <PulseLoader color={white} />
    </LoaderContainer>
  ) : signedIn ? (
    <Home {...homeProps} />
  ) : (
    <Landing repositoryURL={repositoryURL} signIn={signIn} />
  );
};
