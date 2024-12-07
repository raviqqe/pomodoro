import { styled } from "@linaria/react";
import { useState } from "react";
import { performanceGraphViewer } from "../../main/performance-graph-viewer.js";
import { signOutManager } from "../../main/sign-out-manager.js";
import {
  PerformanceGraph,
  type Props as PerformanceGraphProps,
} from "./PerformanceGraph.js";
import { SignOut } from "./SignOut.js";
import { Timer, type Props as TimerProps } from "./Timer.js";
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

export interface Props
  extends Omit<TimerProps, "seconds" | "state" | "stopped">,
    PerformanceGraphProps {
  timer: Pick<TimerProps, "seconds" | "state" | "stopped">;
}

export const Home = ({
  performanceGraph,
  timer,
  ...restProps
}: Props): JSX.Element => {
  const [graphViewed, setGraphViewed] = useState(false);

  return (
    <Container>
      {graphViewed ? (
        <PerformanceGraph performanceGraph={performanceGraph} />
      ) : (
        <Timer {...timer} {...restProps} />
      )}
      <ButtonsContainer>
        <SignOut signOut={() => signOutManager.signOut()} />
        {graphViewed ? (
          <ViewTimer viewTimer={() => setGraphViewed(false)} />
        ) : (
          <ViewGraph
            viewGraph={async () => {
              await performanceGraphViewer.viewGraph();
              setGraphViewed(true);
            }}
          />
        )}
      </ButtonsContainer>
    </Container>
  );
};
