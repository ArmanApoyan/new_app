import { ADD_TASK, CHANGE, DELETE, UPDATE, SEARCH, GET_TASKS } from "./types";
import { Goal } from "../../types/global";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { axiosGet, axiosPost } from "../../config/axios";

function setTasks(result: [Goal]) {
  return {
    type: GET_TASKS,
    data: result,
  };
}

export function getTasks() {
  return async (dispatch: Dispatch<AnyAction>) => {
    const { result } = await axiosGet("/getTasks", localStorage.token, localStorage.userId);
    result.map((el: any) => delete el.__v);
    console.log(result);
    dispatch(setTasks(result));
  };
}

export const addTask = (data: any) => {
  return { type: ADD_TASK, data };
};

const updateTask = (data: any) => {
  return { type: CHANGE, data };
};

export const action1 = (type: string, task: any) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    if (type == "create") {
      axiosPost("/updateTask", task, localStorage.token);
      dispatch(updateTask(task));
    } else {
      const data = {...task,userId:localStorage.userId}
      axiosPost("/addTask", data, localStorage.token);
      dispatch(addTask(task));
    }
  };
};