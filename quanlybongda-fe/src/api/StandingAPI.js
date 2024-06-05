import axios from "axios";
import Cookies from "js-cookie";
import { redirectStatusResponse } from "../component/router/StatusRouter";
import { message } from "antd";

const REST_API_BASE_URL = "http://localhost:8080/api/standings";
const axiosInstance = axios.create({
  baseURL: REST_API_BASE_URL,
});
// Add a request interceptor to include the Bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const listStanding = async (id) => {
    try {
      const response = await axiosInstance.get(`${REST_API_BASE_URL}?id=${id}`);
      return response.data;
    } catch (err) {
      if (err.response && err.response.status !== 200) {
        redirectStatusResponse(err.response.status);
      }
      message.error(
        `${err.message} có lỗi khi cố gắng tải bảng xếp hạng.`
      );
      return null;
    }
  };