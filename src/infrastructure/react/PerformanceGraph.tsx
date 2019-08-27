import { DateTime } from "luxon";
import React from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  Bar,
  BarChart
} from "recharts";
import styled from "styled-components";
import { DateSerializer } from "../../domain/date-serializer";
import { IPerformanceGraph } from "../../application/performance-graph";

const Container = styled.div`
  width: 80vw;
  height: 80vh;
`;

const NoGraphMessage = styled.div`
  color: white;
  font-size: 1.5em;
`;

export interface IProps {
  performanceGraph: IPerformanceGraph;
}

export const PerformanceGraph = ({ performanceGraph }: IProps) =>
  performanceGraph.data.length === 0 ? (
    <NoGraphMessage>No performance graph to show yet!</NoGraphMessage>
  ) : (
    <Container>
      <ResponsiveContainer>
        <BarChart data={performanceGraph.data}>
          <CartesianGrid stroke="grey" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date: string): string =>
              DateTime.fromJSDate(
                DateSerializer.deserialize(date)
              ).toLocaleString({ day: "numeric", month: "long" })
            }
            tickMargin={10}
            stroke="grey"
          />
          <YAxis allowDecimals={false} tickMargin={5} stroke="grey">
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
