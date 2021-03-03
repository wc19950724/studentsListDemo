import axios from "axios";
import { Message } from "element-ui";

const ajax = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000
});

ajax.interceptors.request.use(
  config => {
    console.log("发起请求");
    console.log(config);
    config.headers.token = "";
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

ajax.interceptors.response.use(response => {
  const res = response.data;
  if (res) {
    return response;
  } else {
    Message.error("返回错误");
    return Promise.reject("error");
  }
});

export default ajax;
