import axiosClient from "../api";

const getArticle = ({ slug }) => {
  return axiosClient.get(`/articles/${slug}`);
};
const deleteArticle = ({ slug }) => {
  return axiosClient.delete(`/articles/${slug}`);
};
const getArticles = ({ tag, author, favorited, limit, offset }) => {
  return axiosClient.get(`/articles`, {
    params: {
      tag,
      author,
      favorited,
      limit,
      offset,
    },
  });
};
const postArticles = (body) => {
  return axiosClient.post(`/articles`, { article: body });
};
const putArticles = (body, slug) => {
  return axiosClient.put(`/articles/${slug}`, { article: body });
};
const getArticleYourFeed = ({ tag, author, favorited, limit, offset }) => {
  return axiosClient.get(`/articles/feed`, {
    params: {
      tag,
      author,
      favorited,
      limit,
      offset,
    },
  });
};
const getTags = () => {
  return axiosClient.get(`/tags`);
};
const favorite = (slug) => {
  return axiosClient.post(`/articles/${slug}/favorite`);
};
const deleteFavorite = (slug) => {
  return axiosClient.delete(`/articles/${slug}/favorite`);
};
const getMyArticle = ({ author, limit, offset }) => {
  return axiosClient.get(`/articles`, {
    params: {
      author,
      limit,
      offset,
    },
  });
};
const getFavoritedArticle = ({ favorited, limit, offset }) => {
  return axiosClient.get(`/articles`, {
    params: {
      favorited,
      limit,
      offset,
    },
  });
};
export {
  getMyArticle,
  getFavoritedArticle,
  getArticle,
  getArticles,
  getTags,
  getArticleYourFeed,
  favorite,
  deleteFavorite,
  deleteArticle,
  postArticles,
  putArticles,
};
