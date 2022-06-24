import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./root";

export const myStore = createStore(rootReducer, applyMiddleware(thunk));
