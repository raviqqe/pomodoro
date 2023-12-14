export interface TimerPresenter {
  presentTime(seconds: number): void;
  presentStopped(stopped: boolean): void;
}
