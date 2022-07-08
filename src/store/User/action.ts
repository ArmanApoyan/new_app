import { Dispatch } from "react";
import { AnyAction } from "redux";
import { axiosPost } from "../../config/axios";
import { USER_LOG } from "./types";

export async function userReg(data: object) {
  const result = await axiosPost("regUser", data);
  if (result.error) {
    alert(result.error);
  }
  if (result.message) {
    alert(result.message);
  } 
}

function logUser(result: any) {
  return {
    type: USER_LOG,
    data: result,
  };
}

export function userLog(data: object) {
  return async (dispatch: Dispatch<AnyAction>) => {
    const result = await axiosPost("logUser", data);
    console.log(result.data);

    if (result.data) {
      localStorage.token = result.token;
      localStorage.refresh = result.refresh;
      localStorage.userId = result.id;
      dispatch(logUser(result.data));
    }
  };
}

export async function refreshToken() {
  const newToken = await axiosPost(
    "/refresh",
    { refresh: localStorage.refresh },
    localStorage.token
  ).then((res) => {
    localStorage.token = newToken;
  });
}

export async function checkToken(token: any) {
  const result = await axiosPost("/tokenCheck", { token });
  return result;
}

export async function newUserReg(data: any) {
  const result = await axiosPost("/newUser", data ).then(res=>res)
  return result;
}
export async function inviteUser(data: any) {
  const result = await axiosPost("/invite", data, localStorage.token ).then(res=>res)
  return result;
}

export async function becomeManager(data: any) {
  const result = await axiosPost("/becomeManager", data, localStorage.token ).then(res=>res)
  return result;
}
