import { Column, Goal } from "../../types/global";
import { myState } from "./state";
import { ADD_TASK, CHANGE, DELETE, SEARCH, UPDATE } from "./types";

interface state {
  columns: Array<Column>;
  goals: Array<Goal>;
  search?:string,
}
interface action {
  type: string;
  data?: any;
  id?: any;
  search?:string,
}

export const myReducer = (state: state = myState, action: action) => {
  switch (action.type) {
    case ADD_TASK:
      state.goals = [...state.goals, action.data];
      break;
    case UPDATE:
      state.goals = action.data;
      break;
    case DELETE:
      state.goals = state.goals.filter((el) => el.id != action.id);
      break;
    case CHANGE:
    let index = 0
    state.goals.forEach((el,i)=>el.id==action.data.id?index=i:false)
    state.goals.splice(index,1,action.data)
      break;
    case SEARCH:
      state.search = action.search
      break;
    default:
      break;
  }
  return { ...state };
};
