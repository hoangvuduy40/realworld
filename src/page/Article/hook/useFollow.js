import {
  postDetailFavorited,
  postFollow,
} from "../../../modules/article/reducer";
import { useNavigate } from "react-router-dom";
import { apiArticle } from "../../../services/article";
import { apiProfile } from "../../../services/profile";
import { getUser, checkToken } from "../../../util/auth";
import { useDispatch } from "react-redux";

const useFollow = ({ slug, author }) => {
  const user = getUser();
  const isToken = checkToken();
  const navigate = useNavigate();
  const removeArticle = () => {
    apiArticle.deleteArticle({ slug });
    navigate("/");
  };
  const dispatch = useDispatch();
  const handleFollow = (follow) => {
    if (isToken) {
      dispatch(postFollow());
      if (follow) {
        apiProfile.unFollow(author.username);
      } else {
        apiProfile.follow(author.username);
      }
    } else {
      navigate("/login");
    }
  };
  const handleHeart = (slug, favorited) => {
    if (isToken) {
      dispatch(postDetailFavorited());
      if (favorited) {
        apiArticle.deleteFavorite(slug);
      } else {
        apiArticle.favorite(slug);
      }
    } else {
      navigate("/login");
    }
  };
  return { handleFollow, handleHeart, removeArticle, user };
};
export default useFollow;
