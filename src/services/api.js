import axios from "axios";
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
    let message = "";
    if (error.response.status === 422) {
      const err = error.response.data.errors;
      if (err.hasOwnProperty("email")) {
        message = "Email đã tồn tại";
      } else if (err.hasOwnProperty("username")) {
        message = "User name đã tồn tại";
      } else if (err.hasOwnProperty("title")) {
        message = "Không có dữ liệu để submit";
      }
    } else if (error.response.status === 401) {
      localStorage.clear();
      message = "Quyền đăng nhập của bạn đã hết hạn";
    } else if (error.response.status === 500) {
      message = "Lỗi server! Mong bạn thông cảm";
    } else if (error.response.status === 400) {
      message = "Yêu cầu của bạn không hợp lệ!";
    } else if (error.response.status === 403) {
      message = "Sai mật khẩu hoặc email!";
    }
    return Promise.reject(message);
  }
);
export default axiosClient;
