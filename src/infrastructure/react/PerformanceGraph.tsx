import { styled } from "@linaria/react";
import { last } from "@raviqqe/loscore";
import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  Bar,
  BarChart,
} from "recharts";
import type * as application from "../../application.js";
import { DateSerializer } from "../../domain/date-serializer.js";
import { grey, red, white } from "./style/colors.js";
import { differenceInDays } from "date-fns";

const Container = styled.div`
  width: 80vw;
  height: 80vh;
`;

const Message = styled.div`
  color: ${white};
  font-size: 1.5em;
`;

export interface Props {
  performanceGraph: application.PerformanceGraph;
}

export const PerformanceGraph = ({
  performanceGraph: { data: points },
}: Props): JSX.Element => {
  const lastPoint = last(points);

  return lastPoint ? (
    <Container>
      <ResponsiveContainer>
        <BarChart data={points}>
          <CartesianGrid fill={white} stroke={grey} strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke={white}
            tickFormatter={(date: string): string => {
              const days: number = differenceInDays(
                DateSerializer.deserialize(lastPoint.date),
                DateSerializer.deserialize(date),
              );

              return days === 0 ? "Today" : `${days} days ago`;
            }}
            tickMargin={10}
          />
          <YAxis allowDecimals={false} stroke={white} tickMargin={5}>
            <Label
              angle={-90}
              position="insideLeft"
              style={{ fill: white }}
              value="Pomodoros"
            />
          </YAxis>
          <Bar dataKey="pomodoros" fill={red} />
        </BarChart>
      </ResponsiveContainer>
    </Container>
  ) : (
    <Message>No performance graph to show yet!</Message>
  );
};
