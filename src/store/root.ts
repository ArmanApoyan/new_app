import { myReducer } from "./Task/reducer";
import { combineReducers } from "redux";
import { userReducer } from "./User/reducer";

export const rootReducer = combineReducers({
  task: myReducer,
  user: userReducer,
});
