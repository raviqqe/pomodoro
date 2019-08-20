import React from "react";
import styled from "styled-components";
import { SignOut } from "./SignOut";
import { Timer, IProps as ITimerProps } from "./Timer";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignOutContainer = styled.div`
  position: fixed;
  top: 0.5em;
  right: 0.5em;
`;

export interface IProps extends ITimerProps {
  signOut: () => void;
}

export const Home = ({ signOut, ...timerProps }: IProps) => (
  <Container>
    <Timer {...timerProps} />
    <SignOutContainer>
      <SignOut signOut={signOut} />
    </SignOutContainer>
  </Container>
);
