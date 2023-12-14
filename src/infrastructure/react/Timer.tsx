import { styled } from "@linaria/react";
import { PomodoroTimerState } from "../../application/pomodoro-timer-state.js";
import { TextButton } from "./TextButton.js";
import { white } from "./style/colors.js";

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
  color: ${white};
  font-size: 10em;
`;

const Minutes = styled.span``;

const Seconds = styled.span`
  font-size: 0.6em;
  margin-left: 0.2ex;
`;

export interface Props {
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
  stopped,
}: Props): JSX.Element => (
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
        <TextButton onClick={stopTimer} secondary>
          Stop
        </TextButton>
      </>
    )}
  </Container>
);
