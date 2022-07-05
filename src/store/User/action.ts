import { Dispatch } from "react";
import { AnyAction } from "redux";
import { axiosPost } from "../../config/axios";
import { USER_LOG } from "./types";

export async function userReg(data: object) {
  const result = await axiosPost("regUser", data);
  if (result.error) {
    alert(result.error);
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
    
    if (result.error) {
      alert(result.error);
    }
    if (result.data) {
        dispatch(logUser(result.data));
    }
  };
}
