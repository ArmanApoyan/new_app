import { combineReducers, createStore } from "redux";
import { myReducer } from "../store/Task/reducer";


export function createTestStore() {
    const store = createStore(
      combineReducers({
        task: myReducer,
      })
    );
    return store;
  }