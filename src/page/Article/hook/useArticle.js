import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArticle } from "../../../modules/article/reducer";
import { fetchAllComment } from "../../../modules/comment/reducer";
import {
  fetchCurrentUser,
  removeCurrentUser,
} from "../../../modules/user/reducer";
import { checkToken } from "../../../util/auth";

const useArticle = () => {
  const isToken = checkToken();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);

  useEffect(() => {
    const getDetailArticle = async () => {
      dispatch(fetchArticle({ slug }));
      dispatch(fetchAllComment({ slug }));
    };
    getDetailArticle();
  }, []);
  useEffect(() => {
    if (isToken) {
      dispatch(fetchCurrentUser());
    } else {
      dispatch(removeCurrentUser());
    }
  }, []);
  return {
    articles,
  };
};
export default useArticle;
