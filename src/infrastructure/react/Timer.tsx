import React, { useState } from "react";
import styled from "styled-components";
import * as application from "../../application/timer";
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
  const [timer] = useState(new application.Timer());
  const [stopped, setStopped] = useState(true);
  const [seconds, setSeconds] = useState(0);

  return (
    <Container>
      {stopped ? (
        <ButtonsContainer>
          <TextButton
            onClick={async () => {
              setStopped(false);

              for await (const seconds of timer.countDownPomodoro()) {
                setSeconds(seconds);
              }

              setStopped(true);
            }}
          >
            Pomodoro
          </TextButton>
          <TextButton
            onClick={async () => {
              setStopped(false);

              for await (const seconds of timer.countDownBreak()) {
                setSeconds(seconds);
              }

              setStopped(true);
            }}
            secondary={true}
          >
            Break
          </TextButton>
        </ButtonsContainer>
      ) : (
        <>
          <Time>
            <Minutes>{Math.floor(seconds / 60)}</Minutes>
            <Seconds>{seconds % 60}</Seconds>
          </Time>
          <TextButton
            onClick={() => {
              timer.stop();
              setStopped(true);
            }}
            secondary={true}
          >
            Stop
          </TextButton>
        </>
      )}
    </Container>
  );
};
