export interface Goal {
  id: number;
  title: string;
  description: string;
  status: string;
}
export type Column = { title: string };

export interface State {
  task: {
    columns: Array<Column>;
    goals: Array<Goal>;
    search:string,
  };
}
