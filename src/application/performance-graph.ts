export interface IPerformanceGraph {
  data: IPerformanceDatum[];
}

export interface IPerformanceDatum {
  date: string;
  pomodoros: number;
}
