import { Timer } from "../application/timer.js";
import { setInterval, clearInterval } from "worker-timers";
import { pomodoroTimerPresenter } from "./pomodoro-timer-presenter.js";

export const timer = new Timer(
  setInterval,
  clearInterval,
  pomodoroTimerPresenter,
);
