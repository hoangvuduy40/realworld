import axiosClient from "../api";

const login = (data) => {
  return axiosClient.post(`/users/login`, data);
};
const register = (data) => {
  return axiosClient.post(`/users`, data);
};

const updateCurrentUser = (body) => {
  return axiosClient.put(`/user`, {
    user: body,
  });
};
const getCurrentUser = () => {
  return axiosClient.get(`/user`);
};
export { login, register, updateCurrentUser, getCurrentUser };
