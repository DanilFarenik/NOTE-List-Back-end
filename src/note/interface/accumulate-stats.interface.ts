export interface IAccumulateStats {
  [key: string]: {
    active: number;
    archive: number;
  };
}
