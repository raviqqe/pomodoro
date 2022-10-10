import "chart.js/auto";
import { last } from "lodash";
import { DateTime } from "luxon";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import {
  IPerformanceDatum,
  IPerformanceGraph,
} from "../../application/performance-graph";
import { DateSerializer } from "../../domain/date-serializer";
import { white, red } from "./style/colors";

const formatDate = (date: string, data: IPerformanceDatum[]): string => {
  const days: number = DateTime.fromJSDate(
    DateSerializer.deserialize((last(data) as { date: string }).date)
  ).diff(DateTime.fromJSDate(DateSerializer.deserialize(date)), "days").days;

  return days === 0 ? "Today" : `${days} days ago`;
};

const Container = styled.div`
  width: 80vw;
  height: 80vh;
`;

const Message = styled.div`
  color: ${white};
  font-size: 1.5em;
`;

export interface IProps {
  performanceGraph: IPerformanceGraph;
}

export const PerformanceGraph = ({
  performanceGraph: { data },
}: IProps): JSX.Element =>
  data.length === 0 ? (
    <Message>No performance graph to show yet!</Message>
  ) : (
    <Container>
      <Bar
        data={{
          datasets: [
            {
              backgroundColor: red,
              data: data.map((datum) => datum.pomodoros),
              label: "Pomodoros",
            },
          ],
          labels: data.map((datum) => formatDate(datum.date, data)),
        }}
      />
    </Container>
  );
