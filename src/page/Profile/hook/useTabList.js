import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../../util/auth";
import { apiArticle } from "../../../services/article";
import useUrlState from "@ahooksjs/use-url-state";
import {
  fetchMyArticle,
  fetchFavoritedArticle,
  postProfileFavorited,
} from "../../../modules/profile/reducer";
const useTabList = ({ activeTab, name }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isToken = checkToken();
  const [pagination, setPagination] = useUrlState({
    page: "1",
    pageSize: "10",
  });
  const handleHeart = (slug, index, favorited) => {
    if (isToken) {
      dispatch(postProfileFavorited({ index, activeTab }));
      if (favorited) {
        apiArticle.deleteFavorite(slug);
      } else {
        apiArticle.favorite(slug);
      }
    } else {
      navigate("/login");
    }
  };
  const onChangePage = (page, pageSize) => {
    setPagination({
      page,
      pageSize,
    });
    const sizePage = pageSize > 0 ? pageSize * page - pageSize : 0;

    if (activeTab === "favoritedTab") {
      dispatch(
        fetchFavoritedArticle({
          limit: pageSize,
          offset: sizePage,
          favorite: name,
        })
      );
    } else if (activeTab === "myTab") {
      dispatch(
        fetchMyArticle({
          limit: pageSize,
          offset: sizePage,
          author: name,
        })
      );
    }
  };
  return { handleHeart, onChangePage, pagination };
};
export default useTabList;
