import React, { useState } from "react";
import styled from "styled-components";
import {
  PerformanceGraph,
  IProps as IPerformanceGraphProps,
} from "./PerformanceGraph";
import { SignOut } from "./SignOut";
import { Timer, IProps as ITimerProps } from "./Timer";
import { ViewGraph } from "./ViewGraph";
import { ViewTimer } from "./ViewTimer";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ButtonsContainer = styled.div`
  position: fixed;
  top: 0.5em;
  right: 0.5em;

  > *:not(:last-child) {
    margin-bottom: 0.5em;
  }
`;

export interface IProps
  extends Omit<ITimerProps, "seconds" | "state" | "stopped">,
    IPerformanceGraphProps {
  signOut: () => void;
  timer: Pick<ITimerProps, "seconds" | "state" | "stopped">;
  viewGraph: () => Promise<void>;
}

export const Home = ({
  performanceGraph,
  signOut,
  timer,
  viewGraph,
  ...restProps
}: IProps) => {
  const [graphViewed, setGraphViewed] = useState(false);

  return (
    <Container>
      {graphViewed ? (
        <PerformanceGraph performanceGraph={performanceGraph} />
      ) : (
        <Timer {...timer} {...restProps} />
      )}
      <ButtonsContainer>
        <SignOut signOut={signOut} />
        {graphViewed ? (
          <ViewTimer viewTimer={() => setGraphViewed(false)} />
        ) : (
          <ViewGraph
            viewGraph={async () => {
              await viewGraph();
              setGraphViewed(true);
            }}
          />
        )}
      </ButtonsContainer>
    </Container>
  );
};
