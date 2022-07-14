import { CLEAR, GET_USER } from "../Task/types";
import { userState } from "./state";
import { SET_USERS, USER_LOG } from "./types";

interface userStateType {
  user: object;
  users:Array<object>,
}
interface action {
  type: string;
  data?: any;
}

export const userReducer = (
  state: userStateType = userState,
  action: action
) => {
  switch (action.type) {
    case USER_LOG:
      state.user = action.data;
      break;
      case CLEAR:
        state.user = {};
        break;
        case SET_USERS:
        state.users = action.data;
        break;
    case GET_USER:
      state.user = action.data;
      break;
    default:
      break;
  }
  return { ...state };
};
