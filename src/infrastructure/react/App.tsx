import { styled } from "@linaria/react";
import { PulseLoader } from "react-spinners";
import { useAsync } from "react-use";
import { applicationInitializer } from "../../main/application-initializer.js";
import { Home, type Props } from "./Home.js";
import { Landing } from "./Landing.js";
import { white } from "./style/colors.js";
import { authenticationPresenter } from "../../main/authentication-presenter.js";
import { useStore } from "@nanostores/react";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export { type Props };

export const App = (props: Props): JSX.Element => {
  useAsync(() => applicationInitializer.initialize(), []);
  const signedIn = useStore(authenticationPresenter.signedIn);

  return signedIn === null ? (
    <LoaderContainer>
      <PulseLoader color={white} />
    </LoaderContainer>
  ) : signedIn ? (
    <Home {...props} />
  ) : (
    <Landing />
  );
};
