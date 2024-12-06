import { PomodoroTimerStarter } from "../application/pomodoro-timer-starter.js";
import { pomodoroTimer } from "../maiin/pomodoro-timer.js";
import { notificationController } from "./notification-controller.js";

export const pomodoroTimerStarter = new PomodoroTimerStarter(
  pomodoroTimer,
  notificationController,
);
