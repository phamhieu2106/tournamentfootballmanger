import { message } from "antd";
import axios from "axios";
import { redirectStatusResponse } from "../component/router/StatusRouter";

const REST_API_BASE_URL = "http://localhost:8080/api/nations";

export const listNations = async () => {
  try {
    const response = await axios.get(REST_API_BASE_URL);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(`${err.message} có lỗi khi cố gắng tải danh sách quốc gia.`);
    return null;
  }
};

export const getNation = async (id) => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status !== 200) {
      redirectStatusResponse(error.response.status);
    }
    message.error(
      `${error.error.message} có lỗi khi cố gắng lấy thông tin quốc gia.`
    );
    return null;
  }
};

export const addNation = async (values) => {
  console.log(values);
  try {
    const formData = new FormData();
    formData.append("nationName", values.nationName);
    formData.append("nationCode", values.nationCode);
    formData.append("imageFile", values.imageFile.file.originFileObj);
    const response = await axios.post(REST_API_BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(`${err.error.message} có lỗi khi cố gắng thêm quốc gia.`);
    return null;
  }
};

export const updateNation = async (id, values) => {
  try {
    const formData = new FormData();
    formData.append("nationName", values.nationName);
    formData.append("nationCode", values.nationCode);
    // Kiểm tra nếu values.imageFile không tồn tại hoặc không có file đã chọn
    if (!values.imageFile || !values.imageFile.file) {
      // Tạo một file trống hoặc sử dụng file mặc định
      const defaultFile = new File([""], "default.jpg", { type: "image/jpeg" });
      formData.append("imageFile", defaultFile);
    } else {
      formData.append("imageFile", values.imageFile.file.originFileObj);
    }
    const response = await axios.put(`${REST_API_BASE_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    if (err.response && err.response.status !== 200) {
      redirectStatusResponse(err.response.status);
    }
    message.error(`${err.error.message} có lỗi khi cố gắng cập nhật quốc gia.`);
    return null;
  }
};
