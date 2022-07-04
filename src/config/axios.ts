import axios from "axios";

const Axios = axios.create({
  withCredentials: true,
});
Axios.defaults.baseURL = 'http://localhost:5000/';
Axios.defaults.timeout = 2000;

export const axiosPost = async (url:string,data:any) =>{
    return (await Axios.post(url,{data}).then(res=>res.data))
}
