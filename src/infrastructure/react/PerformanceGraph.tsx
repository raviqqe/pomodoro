import { defaultImport } from "default-import";
import { last } from "lodash";
import { DateTime } from "luxon";
import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  Bar,
  BarChart,
} from "recharts";
import defaultStyled from "styled-components";
import { type IPerformanceGraph } from "../../application/performance-graph.js";
import { DateSerializer } from "../../domain/date-serializer.js";
import { white } from "./style/colors.js";

const styled = defaultImport(defaultStyled);

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
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid fill="white" stroke="grey" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke="grey"
            tickFormatter={(date: string): string => {
              const days: number = DateTime.fromJSDate(
                DateSerializer.deserialize(
                  (last(data) as { date: string }).date,
                ),
              ).diff(
                DateTime.fromJSDate(DateSerializer.deserialize(date)),
                "days",
              ).days;

              return days === 0 ? "Today" : `${days} days ago`;
            }}
            tickMargin={10}
          />
          <YAxis allowDecimals={false} stroke="grey" tickMargin={5}>
            <Label
              angle={-90}
              position="insideLeft"
              style={{ fill: "grey" }}
              value="Pomodoros"
            />
          </YAxis>
          <Bar dataKey="pomodoros" fill="salmon" />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
