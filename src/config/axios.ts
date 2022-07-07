import axios from "axios";

const Axios = axios.create({
  withCredentials: true,
});
Axios.defaults.baseURL = "http://localhost:5000/";
Axios.defaults.timeout = 5000;

export const axiosPost = async (url: string, data: any, token: string = "") => {
  return await Axios.post(
    url,
    { data },
    {
      headers: { Authorization: token },
    }
  ).then((res) => res.data);
};

export const axiosGet = async (url: string, token: string) => {
  return await Axios.get(url, {
    headers: { Authorization: token },
  }).then((res) => res.data);
};
