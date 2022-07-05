import { userState } from "./state";
import { USER_LOG } from "./types";


interface userStateType {
  user:object
}
interface action {
  type: string;
  data?:any
}

export const userReducer = (state: userStateType = userState, action: action) => {
  switch (action.type) {
    case USER_LOG:
      state.user = action.data
      console.log(state.user);
      break;
    default:
      break;
  }
  return { ...state };
};
