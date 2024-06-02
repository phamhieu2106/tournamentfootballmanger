import { message } from "antd";
import axios from "axios";
import { redirectStatusResponse } from "../component/router/StatusRouter";
import Cookies from "js-cookie";

const REST_API_BASE_URL = "http://localhost:8080/api/tournaments";

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

export const listTournaments = async () => {
  try {
    const response = await axiosInstance.get(REST_API_BASE_URL);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(`${err.message} có lỗi khi cố gắng tải danh sách giải đấu.`);
    return null;
  }
};
export const getTournament = async (id) => {
  try {
    const response = await axiosInstance.get(`${REST_API_BASE_URL}/${id}`);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(`${err.message} có lỗi khi cố gắng lấy thông tin giải đấu.`);
    return null;
  }
};

export const addTournament = async (values) => {
  console.log(values);
  try {
    const formData = new FormData();
    formData.append("nameTournament", values.nameTournament);
    formData.append("totalRound", Number(values.idTeams.length * 2));
    formData.append(
      "startDate",
      convertToLocalDate(values.timeTournament[0].$d)
    );
    formData.append("endDate", convertToLocalDate(values.timeTournament[1].$d));
    formData.append("idTeams", values.idTeams);
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
    message.error(`${err} có lỗi khi cố gắng thêm giải đấu.`);
  }
};

export const updateTournament = async (id, values) => {
  try {
    const formData = new FormData();

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
    message.error(`${err.error.message} có lỗi khi cố gắng cập nhật giải đấu.`);
    return null;
  }
};

const convertToLocalDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
