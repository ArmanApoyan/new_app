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

export interface userStateType {
  user:{
    user:{
      id:string;
      username:string;
      email:string;
      password:string;
      role:string;
      initedUser?:string;
    }
  }
}
