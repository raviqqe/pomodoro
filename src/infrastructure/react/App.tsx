import { useAsync } from "react-use";
import { PulseLoader } from "react-spinners";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { AuthenticationStore } from "../mobx/authentication-store";
import { PomodoroTimerStore } from "../mobx/pomodoro-timer-store";
import { IProps as ILandingProps, Landing } from "./Landing";
import { Home, IProps as IHomeProps } from "./Home";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

interface IProps
  extends Pick<IHomeProps, "stopTimer" | "startTimer" | "signOut">,
    ILandingProps {
  authenticationStore: AuthenticationStore;
  pomodoroTimerStore: PomodoroTimerStore;
  initialize: () => Promise<void>;
}

export const App = observer(
  ({
    authenticationStore: { signedIn },
    pomodoroTimerStore: { seconds, state, stopped },
    initialize,
    repositoryURL,
    signIn,
    ...homeProps
  }: IProps) => {
    useAsync(initialize, []);

    return signedIn === null ? (
      <LoaderContainer>
        <PulseLoader color="white" />
      </LoaderContainer>
    ) : signedIn ? (
      <Home {...homeProps} seconds={seconds} state={state} stopped={stopped} />
    ) : (
      <Landing repositoryURL={repositoryURL} signIn={signIn} />
    );
  }
);
