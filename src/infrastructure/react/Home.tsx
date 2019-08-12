import React from "react";
import { PulseLoader } from "react-spinners";
import styled from "styled-components";
import { SignOut } from "./SignOut";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 85ex;
  max-width: 100%;
  margin: auto;

  > :first-child {
    flex: 1;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
      <LoaderContainer>
        <PulseLoader color="white" />
      </LoaderContainer>
      <SignOutContainer>
        <SignOut signOut={signOut} />
      </SignOutContainer>
    </Container>
  );
};
