import React, { useState } from "react";
import styled from "styled-components";
import {
  PomodoroTimerState,
  PomodoroTimer
} from "../../application/pomodoro-timer";
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

export const Timer = () => {
  const [timer] = useState(new PomodoroTimer());
  const [stopped, setStopped] = useState(true);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [state, setState] = useState(PomodoroTimerState.Pomodoro);

  return (
    <Container>
      {stopped ? (
        <ButtonsContainer>
          <TextButton
            onClick={async () => {
              setStopped(false);

              for await (const seconds of timer.start()) {
                setSeconds(seconds);
              }

              setStopped(true);
              setState(timer.state());
            }}
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
            <TextButton
              onClick={() => {
                timer.restart();
                setPaused(false);
              }}
            >
              Restart
            </TextButton>
          ) : (
            <TextButton
              onClick={() => {
                timer.pause();
                setPaused(true);
              }}
              secondary={true}
            >
              Pause
            </TextButton>
          )}
        </>
      )}
    </Container>
  );
};
