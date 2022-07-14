import axios from "axios";

const Axios = axios.create({
  withCredentials: true,
});
Axios.defaults.baseURL = "http://localhost:5000/";
Axios.defaults.timeout = 5000;

export const axiosPost = async (
  url: string,
  data: any,
  token: string = "",
  userId: string = ""
) => {
  if (localStorage.token) {
    const result = await Axios.get("/refresh", {
      headers: {
        Authorization: localStorage?.token,
        refresh: localStorage?.refresh,
      },
    }).then((res) => res.data);
    if(result.message==="Refresh token is not valid!"){
      localStorage.removeItem(token)
    }
    else if (result.newToken) {
      localStorage.token = result.newToken;
      localStorage.refresh = result.newRefresh;
    }
  }
  return await Axios.post(
    url,
    { data },
    {
      headers: { Authorization: localStorage.token, userId: userId },
    }
  ).then((res) => res.data);
};

export const axiosGet = async (
  url: string,
  token: string,
  userId: string = ""
) => {
  return await Axios.get(url, {
    headers: { Authorization: localStorage.token, userId: userId },
  }).then((res) => res.data);
};

export const axiosImage = async (url: string, data: any) => {
  if (localStorage.token) {
    const result = await Axios.get("/refresh", {
      headers: {
        Authorization: localStorage?.token,
        refresh: localStorage?.refresh,
      },
    }).then((res) => res.data);
    if (result.newToken) {
      localStorage.token = result.newToken;
      localStorage.refresh = result.newRefresh;
    }
  }
  const formData = new FormData();
  formData.append("image", data.image);
  delete data.image;
  formData.append("id", data.id);
  console.log(formData);
  
  return await Axios.post(url, formData, {
    headers: {
      Authorization: localStorage.token,
    },
  }).then((res) => res.data);
};

export const axiosRecaptcha = async (
  url: string,
  data: string,
) => {
  return await Axios.post(url,{data}).then((res) => res.data);
};
