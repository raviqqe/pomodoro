import React from "react";
import styled from "styled-components";
import { PomodoroTimerState } from "../../application/pomodoro-timer-state";
import { TextButton } from "./TextButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin: 1em;
  }
`;

const Time = styled.div`
  color: white;
`;

const Minutes = styled.span`
  font-size: 10em;
`;

const Seconds = styled.span`
  font-size: 6em;
  margin-left: 0.2ex;
`;

export interface IProps {
  seconds: number;
  stopped: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  state: PomodoroTimerState;
}

export const Timer = ({
  stopped,
  stopTimer,
  seconds,
  startTimer,
  state
}: IProps) => (
  <Container>
    {stopped ? (
      <ButtonsContainer>
        <TextButton
          onClick={startTimer}
          secondary={state !== PomodoroTimerState.Pomodoro}
        >
          Start{" "}
          {state === PomodoroTimerState.Pomodoro
            ? "Pomodoro"
            : state === PomodoroTimerState.ShortBreak
            ? "Short Break"
            : "Long Break"}
        </TextButton>
      </ButtonsContainer>
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
