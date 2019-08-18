import React from "react";
import styled from "styled-components";
import { SignOut } from "./SignOut";
import { Timer } from "./Timer";

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

export interface IProps {
  signOut: () => Promise<void>;
}

export const Home = ({ signOut }: IProps) => {
  return (
    <Container>
      <Timer />
      <SignOutContainer>
        <SignOut signOut={signOut} />
      </SignOutContainer>
    </Container>
  );
};
