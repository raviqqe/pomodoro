export interface TimerPresenter {
  presentStopped(stopped: boolean): void;
  presentTime(seconds: number): void;
}
