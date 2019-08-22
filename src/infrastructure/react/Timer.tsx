import React from "react";
import styled from "styled-components";
import { PomodoroTimerState } from "../../application/pomodoro-timer-state";
import { TextButton } from "./TextButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin: 1rem;
  }
`;

const State = styled.div`
  font-size: 5em;
`;

const Time = styled.div`
  color: white;
  font-size: 10em;
`;

const Minutes = styled.span``;

const Seconds = styled.span`
  font-size: 0.6em;
  margin-left: 0.2ex;
`;

export interface IProps {
  seconds: number;
  startTimer: () => void;
  state: PomodoroTimerState;
  stopTimer: () => void;
  stopped: boolean;
}

export const Timer = ({
  seconds,
  startTimer,
  state,
  stopTimer,
  stopped
}: IProps) => (
  <Container>
    {stopped ? (
      <>
        <State>
          {state === PomodoroTimerState.Pomodoro
            ? "🍅"
            : state === PomodoroTimerState.ShortBreak
            ? "🛌"
            : "🛌🛌"}
        </State>
        <TextButton onClick={startTimer}>Start</TextButton>
      </>
    ) : (
      <>
        <Time>
          <Minutes>{Math.floor(seconds / 60)}</Minutes>
          <Seconds>{seconds % 60}</Seconds>
        </Time>
        <TextButton onClick={stopTimer} secondary={true}>
          Stop
        </TextButton>
      </>
    )}
  </Container>
);
