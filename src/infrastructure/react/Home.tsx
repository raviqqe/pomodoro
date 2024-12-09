import { styled } from "@linaria/react";
import { useState } from "react";
import { performanceGraphViewer } from "../../main/performance-graph-viewer.js";
import { PerformanceGraph } from "./PerformanceGraph.js";
import { SignOut } from "./SignOut.js";
import { Timer } from "./Timer.js";
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

export const Home = (): JSX.Element => {
  const [graphViewed, setGraphViewed] = useState(false);

  return (
    <Container>
      {graphViewed ? <PerformanceGraph /> : <Timer />}
      <ButtonsContainer>
        <SignOut />
        {graphViewed ? (
          <ViewTimer onClick={() => setGraphViewed(false)} />
        ) : (
          <ViewGraph
            onClick={async () => {
              await performanceGraphViewer.viewGraph();
              setGraphViewed(true);
            }}
          />
        )}
      </ButtonsContainer>
    </Container>
  );
};
