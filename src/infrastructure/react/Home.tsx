import { useState } from "react";
import defaultStyled from "styled-components";
import {
  PerformanceGraph,
  type IProps as IPerformanceGraphProps,
} from "./PerformanceGraph.js";
import { SignOut } from "./SignOut.js";
import { Timer, type IProps as ITimerProps } from "./Timer.js";
import { ViewGraph } from "./ViewGraph.js";
import { ViewTimer } from "./ViewTimer.js";

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
}: IProps): JSX.Element => {
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
