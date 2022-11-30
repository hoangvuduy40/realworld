import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../../../util/auth";
import { apiArticle } from "../../../services/article";
import useUrlState from "@ahooksjs/use-url-state";
import {
  postFavorited,
  fetchAllArticle,
  fetchAllArticleYourFeed,
} from "../../../modules/article/reducer";

const useTab = ({ activeTab, tagName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isToken = checkToken();
  const [pagination, setPagination] = useUrlState({
    page: "1",
    pageSize: "10",
  });
  const handleHeart = (slug, index, favorited) => {
    if (isToken) {
      dispatch(postFavorited({ index, activeTab }));
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

    if (activeTab === "globalTab") {
      dispatch(fetchAllArticle({ limit: pageSize, offset: sizePage }));
    } else if (activeTab === "tagTab") {
      dispatch(
        fetchAllArticle({
          limit: pageSize,
          offset: sizePage,
          tag: tagName,
        })
      );
    } else if (activeTab === "yourTab") {
      dispatch(fetchAllArticleYourFeed({ limit: pageSize, offset: sizePage }));
    }
  };
  return { handleHeart, onChangePage, pagination };
};
export default useTab;
