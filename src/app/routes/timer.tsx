import { useStore } from "@nanostores/react";
import type { JSX } from "react";
import { pomodoroTimerPresenter } from "../../main/pomodoro-timer-presenter.js";
import { pomodoroTimerStarter } from "../../main/pomodoro-timer-starter.js";
import { pomodoroTimerStopper } from "../../main/pomodoro-timer-stopper.js";
import { TextButton } from "../components/TextButton.js";
import styles from "./timer.module.css";

export default (): JSX.Element => {
  const stopped = useStore(pomodoroTimerPresenter.stopped);
  const state = useStore(pomodoroTimerPresenter.state);
  const seconds = useStore(pomodoroTimerPresenter.seconds);

  return (
    <div className={styles.root}>
      {stopped ? (
        <>
          <div className={styles.state}>
            {state === "pomodoro"
              ? "🍅"
              : state === "shortBreak"
                ? "🛌"
                : "🛌🛌"}
          </div>
          <TextButton onClick={() => pomodoroTimerStarter.start()}>
            Start
          </TextButton>
        </>
      ) : (
        <>
          <div className={styles.time}>
            <span>{Math.floor(seconds / 60)}</span>
            <span className={styles.seconds}>{seconds % 60}</span>
          </div>
          <TextButton onClick={() => pomodoroTimerStopper.stop()} secondary>
            Stop
          </TextButton>
        </>
      )}
    </div>
  );
};
