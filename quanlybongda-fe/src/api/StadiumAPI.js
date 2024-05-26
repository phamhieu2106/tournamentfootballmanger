import { message } from "antd";
import axios from "axios";
import { redirectStatusResponse } from "../component/router/StatusRouter";

const REST_API_BASE_URL = "http://localhost:8080/api/stadiums";

export const listStadium = async () => {
  try {
    const response = await axios.get(REST_API_BASE_URL);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(
      `${err.message} có lỗi khi cố gắng tải danh sách sân vận động.`
    );
    return null;
  }
};

export const getStadium = async (id) => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/${id}`);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(
      `${err.message} có lỗi khi cố gắng lấy thông tin sân vận động.`
    );
    return null;
  }
};

export const addStadium = async (values) => {
  console.log(values);
  try {
    const formData = new FormData();
    formData.append("nameStadium", values.nameStadium);
    formData.append("capacity", values.capacity);
    formData.append("location", values.location);
    formData.append("idTeam", values.idTeam ? values.idTeam : null);
    const response = await axios.post(REST_API_BASE_URL, formData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(`${err} có lỗi khi cố gắng thêm sân vận động.`);
    return null;
  }
};

export const updateStadium = async (id, values) => {
  try {
    const formData = new FormData();
    formData.append("nameStadium", values.nameStadium);
    formData.append("capacity", values.capacity);
    formData.append("location", values.location);
    formData.append("idTeam", values.idTeam);
    const response = await axios.put(`${REST_API_BASE_URL}/${id}`, formData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(
      `${err.error.message} có lỗi khi cố gắng cập nhật sân vận động.`
    );
    return null;
  }
};
