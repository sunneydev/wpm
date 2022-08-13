export interface Progress {
  started: boolean;
  total: number;
  current: number;
  incorrect: number;
  history: Record<number, boolean>;
}
