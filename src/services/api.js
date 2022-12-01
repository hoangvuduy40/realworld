import axios from "axios";
import { useNavigate } from "react-router-dom";
const axiosClient = axios.create({
  baseURL: "https://api.realworld.io/api/",
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const { token } = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  if (!token) {
    return config;
  }
  config.headers = {
    Authorization: "Bearer " + token,
  };
  return config;
});
axiosClient.interceptors.response.use(
  async (response) => {
    return response.data;
  },
  function (error) {
    const navigate = useNavigate();
    let message = "";
    switch (error.response.status) {
      case 442:
        const err = error.response.data.errors;
        if (err.hasOwnProperty("email")) {
          message = "Email đã tồn tại";
        } else if (err.hasOwnProperty("username")) {
          message = "User name đã tồn tại";
        } else if (err.hasOwnProperty("title")) {
          message = "Không có dữ liệu để submit";
        }
        break;
      case 500:
        navigate("/500");
        message = "Lỗi server! Mong bạn thông cảm";
        break;
      case 400:
        message = "Yêu cầu của bạn không hợp lệ!";
        break;
      case 403:
        message = "Sai mật khẩu hoặc email!";
        break;
      case 401:
        navigate("/login");
        localStorage.clear();
        message = "Quyền đăng nhập của bạn đã hết hạn";
        break;
      default:
        message = "Yes!";
        break;
    }
    return Promise.reject(message);
  }
);
export default axiosClient;
