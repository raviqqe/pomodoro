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
  paused: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  restartTimer: () => void;
  state: PomodoroTimerState;
}

export const Timer = ({
  paused,
  pauseTimer,
  restartTimer,
  seconds,
  startTimer,
  state
}: IProps) => (
  <Container>
    {seconds === 0 ? (
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
        {paused ? (
          <TextButton onClick={restartTimer}>Restart</TextButton>
        ) : (
          <TextButton onClick={pauseTimer} secondary={true}>
            Pause
          </TextButton>
        )}
      </>
    )}
  </Container>
);
