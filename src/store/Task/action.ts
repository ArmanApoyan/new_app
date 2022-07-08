import { ADD_TASK, CHANGE, DELETE, UPDATE, SEARCH, GET_TASKS, GET_USER } from "./types";
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

function setUser(user: any) {
  return {
    type: GET_USER,
    data: user,
  };
}

export function getTasks() {
  return async (dispatch: Dispatch<AnyAction>) => {
    const { result, user } = await axiosGet("/getTasks", localStorage.token, localStorage.userId);
    result.map((el: any) => delete el.__v);
    dispatch(setTasks(result));
    dispatch(setUser(user));
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

const reorder = (data:[Goal]) => {
  return ({
    type: UPDATE,
    data
  })
}

export const reorderTasks = (type: string, data: any) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    let tasks:any = [...data]
    tasks.forEach((el:any)=>el.userId = localStorage.userId)
      axiosPost("/reorderTasks", tasks, localStorage.token, localStorage.userId);
      dispatch(reorder(tasks));
  };
};