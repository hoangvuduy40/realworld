import axiosClient from "../api";

const getAllComment = ({ slug }) => {
  return axiosClient.get(`/articles/${slug}/comments`);
};
const deleteComment = ({ slug, id }) => {
  return axiosClient.delete(`/articles/${slug}/comments/${id}`);
};
const postComment = ({ slug, data }) => {
  return axiosClient.post(`/articles/${slug}/comments`, {
    comment: {
      body: data,
    },
  });
};

export { getAllComment, postComment, deleteComment };
