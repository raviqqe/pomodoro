import React from "react";
import { ResponsiveContainer, XAxis, YAxis, Bar, BarChart } from "recharts";
import styled from "styled-components";
import { DateSerializer } from "../../domain/date-serializer";
import { IPerformanceGraph } from "../../application/performance-graph";

const Container = styled.div`
  width: 80vw;
  height: 80vh;
`;

export interface IProps {
  performanceGraph: IPerformanceGraph;
}

export const PerformanceGraph = ({ performanceGraph }: IProps) => (
  <Container>
    <ResponsiveContainer>
      <BarChart data={performanceGraph.points}>
        <XAxis
          dataKey="date"
          tickFormatter={date =>
            DateSerializer.deserialize(date).toLocaleDateString()
          }
          tickMargin={10}
        />
        <YAxis tickMargin={5} />
        <Bar dataKey="pomodoros" fill="salmon" />
      </BarChart>
    </ResponsiveContainer>
  </Container>
);
