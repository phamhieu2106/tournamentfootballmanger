import { message } from "antd";
import axios from "axios";
import { redirectStatusResponse } from "../component/router/StatusRouter";
import Cookies from "js-cookie";

const REST_API_BASE_URL = "http://localhost:8080/api/coaches";
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

export const listCoaches = async () => {
  try {
    const response = await axiosInstance.get(REST_API_BASE_URL);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(
      `${err.message} có lỗi khi cố gắng tải danh sách huấn luyện viên.`
    );
    return null;
  }
};

export const getCoach = async (id) => {
  try {
    const response = await axiosInstance.get(`${REST_API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    message.error(
      `${error.message} có lỗi khi cố gắng lấy thông tin huấn luyện viên.`
    );
    return null;
  }
};

export const addCoach = async (values) => {
  console.log(values);
  try {
    const formData = new FormData();
    formData.append("name", values.fullName);
    formData.append("dob", convertDateToYYYYMMDD(values.dob.$d));
    formData.append("sex", values.sex);
    formData.append("idNational", values.idNation);
    formData.append("status", values.status);
    const response = await axiosInstance.post(REST_API_BASE_URL, formData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(`${err} có lỗi khi cố gắng thêm huấn luyện viên.`);
    return null;
  }
};

export const updateCoach = async (id, values) => {
  try {
    const formData = new FormData();
    formData.append("name", values.fullName);
    formData.append("dob", values.dob);
    formData.append("sex", values.sex);
    formData.append("idNational", values.idNation);
    formData.append("status", values.status);
    const response = await axiosInstance.put(
      `${REST_API_BASE_URL}/${id}`,
      formData
    );
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(
      `${err.error.message} có lỗi khi cố gắng cập nhật huấn luyện viên.`
    );
    return null;
  }
};

export const removeCoach = async (id) => {
  try {
    const response = await axiosInstance.delete(`${REST_API_BASE_URL}/${id}`);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(
      `${err.error.message} có lỗi khi cố gắng cập nhật huấn luyện viên.`
    );
    return null;
  }
};

const convertDateToYYYYMMDD = (dateString) => {
  const dateObject = new Date(dateString); // Tạo đối tượng ngày tháng từ chuỗi
  const year = dateObject.getFullYear(); // Lấy năm
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Lấy tháng và thêm số 0 đằng trước nếu cần
  const day = String(dateObject.getDate()).padStart(2, "0"); // Lấy ngày và thêm số 0 đằng trước nếu cần
  return `${year}-${month}-${day}`; // Trả về chuỗi theo định dạng "yyyy-MM-dd"
};
