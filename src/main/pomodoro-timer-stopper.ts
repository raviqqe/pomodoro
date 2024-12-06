import { PomodoroTimerStopper } from "../application/pomodoro-timer-stopper.js";
import { pomodoroTimer } from "../maiin/pomodoro-timer.js";

export const pomodoroTimerStopper = new PomodoroTimerStopper(pomodoroTimer);
