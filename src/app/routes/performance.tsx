import { styled } from "@linaria/react";
import { useStore } from "@nanostores/react";
import { last } from "@raviqqe/loscore";
import { differenceInDays } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { DateSerializer } from "../../domain/date-serializer.js";
import { performanceGraphPresenter } from "../../main/performance-graph-presenter.js";
import { grey, red, white } from "../style.js";

const Container = styled.div`
  width: 80vw;
  height: 80vh;
`;

const Message = styled.div`
  color: ${white};
  font-size: 1.5em;
`;

export default (): JSX.Element => {
  const { data } = useStore(performanceGraphPresenter.graph);
  const lastDatum = last(data);

  return lastDatum ? (
    <Container>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid fill={white} stroke={grey} strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke={white}
            tickFormatter={(date: string): string => {
              const days: number = differenceInDays(
                DateSerializer.deserialize(lastDatum.date),
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
