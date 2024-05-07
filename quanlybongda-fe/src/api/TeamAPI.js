import { message } from "antd";
import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/teams";

export const listTeams = async () => {
  try {
    const response = await axios.get(REST_API_BASE_URL);
    return response.data;
  } catch (err) {
    message.error(`${err.message} có lỗi khi cố gắng tải danh sách đội bóng.`);
    return null;
  }
};
