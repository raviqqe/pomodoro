import styled from "styled-components";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory";
import {
  IPerformanceDatum,
  IPerformanceGraph,
} from "../../application/performance-graph";
import { DateSerializer } from "../../domain/date-serializer";
import { grey } from "./style/colors";

const Container = styled.div`
  width: 80vw;
  height: 80vh;
`;

const Message = styled.div`
  color: ${grey};
  font-size: 1.5em;
`;

export interface IProps {
  performanceGraph: IPerformanceGraph;
}

export const PerformanceGraph = ({
  performanceGraph: { data },
}: IProps): JSX.Element => {
  // eslint-disable-next-line
  console.log(data);
  return data.length === 0 ? (
    <Message>No performance graph to show yet!</Message>
  ) : (
    <Container>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryBar
          data={data}
          style={{ data: { fill: "#c43a31" } }}
          x={(datum: IPerformanceDatum) =>
            DateSerializer.deserialize(datum.date)
          }
        />
      </VictoryChart>
    </Container>
  );
};
