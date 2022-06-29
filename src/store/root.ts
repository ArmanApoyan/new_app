import { myReducer } from "./Task/reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  task: myReducer,
});
