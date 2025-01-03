import { PomodoroTimer } from "../application/pomodoro-timer.js";
import { pomodoroTimerPresenter } from "../main/pomodoro-timer-presenter.js";
import { notificationPresenter } from "./notification-presenter.js";
import { performanceTracker } from "./performance-tracker.js";
import { timer } from "./timer.js";

export const pomodoroTimer = new PomodoroTimer(
  timer,
  pomodoroTimerPresenter,
  notificationPresenter,
  performanceTracker,
);
