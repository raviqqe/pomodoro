import React from "react";
import { GoMarkGithub } from "react-icons/go";
import styled from "styled-components";
import { SignIn } from "./SignIn";
import { blue, black } from "./style/colors";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * {
    margin: 2rem;
  }
`;

const Title = styled.div`
  color: ${blue};
  font-family: "Chelsea Market", sans-serif;
  font-size: 4em;
  font-weight: bold;
  letter-spacing: -0.35ex;
  text-shadow: 0.4em 0.4em 0.4em rgba(0, 0, 0, 0.1);
`;

const GitHubLink = styled.a`
  font-size: 2.5rem;
  margin: 1.5rem;
  color: ${black};
  display: block;
  position: fixed;
  bottom: 0em;
  right: 0em;
  line-height: 0ex;
`;

export interface IProps {
  repositoryURL: string;
  signIn: () => void;
}

export const Landing = ({ repositoryURL, signIn }: IProps): JSX.Element => (
  <Container>
    <Title>P🍅m🍅d🍅r🍅</Title>
    <SignIn signIn={signIn} />
    <GitHubLink href={repositoryURL} target="_blank">
      <GoMarkGithub />
    </GitHubLink>
  </Container>
);
