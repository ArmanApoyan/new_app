import { ADD_TASK, CHANGE, DELETE, UPDATE, SEARCH } from "./types";
import { Goal } from "../../types/global";
import { Dispatch } from "react";
import { AnyAction } from "redux";

export function addTask(data: Goal) {
  return {
    type: ADD_TASK,
    data,
  };
}

export function update(data: Goal[]) {
  return {
    type: UPDATE,
    data,
  };
}

export function deleteTask(id: number) {
  return {
    type: DELETE,
    id,
  };
}

export function changeTask(data: Goal) {
  return {
    type: CHANGE,
    data,
  };
}

const addAction = (data: any) => {
  return { type: ADD_TASK, data };
};

const creatAction = (data: any) => {
  return { type: CHANGE, data };
};

export const action1 = (type: string, task: any) => {
  return (dispatch: Dispatch<AnyAction>) => {
    if (type == "create") {
      dispatch(creatAction(task));
    } 
    else dispatch(addAction(task));
  };
};

export function searchTask(search:string) {
    return {
      type: SEARCH,
      search,
    };
  }
