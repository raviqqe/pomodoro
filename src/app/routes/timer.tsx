import { styled } from "@linaria/react";
import { useState } from "react";
import { performanceGraphViewer } from "../../main/performance-graph-viewer.js";
import { PerformanceGraph } from "../components/PerformanceGraph.js";
import { SignOut } from "../components/SignOut.js";
import { Timer } from "../components/Timer.js";
import { ViewGraph } from "../components/ViewGraph.js";
import { ViewTimer } from "../components/ViewTimer.js";

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

export default (): JSX.Element => {
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
