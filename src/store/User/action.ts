import { Dispatch } from "react";
import { AnyAction } from "redux";
import { axiosPost } from "../../config/axios";
import { USER_LOG } from "./types";

export async function userReg(data: object) {
  axiosPost("regUser", data);
}

export async function userLog(data: object) {
  const result = await axiosPost("logUser", data);
  console.log(result);
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch({ data: result, type: USER_LOG });
  };
}
