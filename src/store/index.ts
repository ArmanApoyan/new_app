import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./root";
import thunk from "redux-thunk";

export const myStore = createStore(rootReducer, applyMiddleware(thunk));
