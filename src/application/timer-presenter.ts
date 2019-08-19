export interface ITimerPresenter {
  presentTime(seconds: number): void;
  presentPaused(paused: boolean): void;
}
