import axiosClient from "../api";

const getProfile = ({ username }) => {
  return axiosClient.get(`/profiles/${username}`);
};
const follow = (username) => {
  return axiosClient.post(`/profiles/${username}/follow`);
};
const unFollow = (username) => {
  return axiosClient.delete(`/profiles/${username}/follow`);
};
export { getProfile, follow, unFollow };
