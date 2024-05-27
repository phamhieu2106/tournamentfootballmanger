import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/v1/auth/authenticate";

export const authentication = async (values) => {
  const user = {
    username: values.username,
    password: values.password,
  };
  try {
    const response = await axios.post(REST_API_BASE_URL, user);
    return response.data?.token;
  } catch (err) {
    console.log(err);
    return null;
  }
};
