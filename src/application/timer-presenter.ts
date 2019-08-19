export interface ITimerPresenter {
  presentTime(seconds: number): void;
  presentStopped(stopped: boolean): void;
}
