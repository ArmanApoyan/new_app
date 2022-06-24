import { combineReducers } from "redux";
import { myReducer } from "./Task/reducer";

export const rootReducer = combineReducers({
  task: myReducer,
});
