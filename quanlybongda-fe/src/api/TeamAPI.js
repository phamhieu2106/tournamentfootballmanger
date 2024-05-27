import { message } from "antd";
import axios from "axios";
import { redirectStatusResponse } from "../component/router/StatusRouter";
import Cookies from "js-cookie";

const REST_API_BASE_URL = "http://localhost:8080/api/teams";
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

export const listTeams = async () => {
  try {
    const response = await axiosInstance.get(REST_API_BASE_URL);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(`${err.message} có lỗi khi cố gắng tải danh sách đội bóng.`);
    return null;
  }
};
export const getTeam = async (id) => {
  try {
    const response = await axiosInstance.get(`${REST_API_BASE_URL}/${id}`);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(`${err.message} có lỗi khi cố gắng lấy thông tin đội bóng.`);
    return null;
  }
};

export const addTeam = async (values) => {
  console.log(values);
  try {
    const formData = new FormData();
    formData.append("teamName", values.teamName);
    formData.append("foundation", values.foundation.$y);
    formData.append("president", values.president);
    formData.append("idCoach", values.idCoach);
    formData.append("imageFile", values.imageFile.file.originFileObj);
    const response = await axiosInstance.post(REST_API_BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(`${err} có lỗi khi cố gắng thêm đội bóng.`);
    return null;
  }
};

export const updateTeam = async (id, values) => {
  try {
    const formData = new FormData();
    formData.append("teamName", values.teamName);
    formData.append("foundation", values.foundation);
    formData.append("president", values.president);
    formData.append("idCoach", values.idCoach);
    if (!values.imageFile || !values.imageFile.file) {
      // Tạo một file trống hoặc sử dụng file mặc định
      const defaultFile = new File([""], "default.jpg", { type: "image/jpeg" });
      formData.append("imageFile", defaultFile);
    } else {
      formData.append("imageFile", values.imageFile.file.originFileObj);
    }

    const response = await axiosInstance.put(
      `${REST_API_BASE_URL}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(`${err.error.message} có lỗi khi cố gắng cập nhật đội bóng.`);
    return null;
  }
};
