import { axiosPost } from "../config/axios";

export const regUser = (data:any) => {
    return axiosPost(`regUser`,data).then(res=>res)
}