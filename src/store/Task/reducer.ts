import { ADD_TASK, CHANGE, DELETE, GET_TASKS, SEARCH, UPDATE } from "./types";
import { Column, Goal } from "../../types/global";
import { myState } from "./state";
import { axiosGet, axiosPost } from "../../config/axios";

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
      case GET_TASKS:
      state.goals = [...action.data]
      console.log(state.goals);
      break;
    case UPDATE:
      state.goals = [...action.data];
      break;
    case DELETE:
      axiosPost("/deleteTask",{id:action.id},localStorage.token)
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
