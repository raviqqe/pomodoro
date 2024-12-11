import { clearInterval, setInterval } from "worker-timers";
import { Timer } from "../application/timer.js";
import { pomodoroTimerPresenter } from "./pomodoro-timer-presenter.js";

export const timer = new Timer(
  setInterval,
  clearInterval,
  pomodoroTimerPresenter,
);
