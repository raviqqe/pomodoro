export interface TimerPresenter {
  // TODO Move these methods into `PomodoroTimerPresenter`.
  presentStopped(stopped: boolean): void;
  presentTime(seconds: number): void;
}
