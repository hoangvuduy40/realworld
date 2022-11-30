import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllArticle,
  fetchAllArticleYourFeed,
} from "../../../modules/article/reducer";
import { checkToken } from "../../../util/auth";
import { fetchAllTag } from "../../../modules/tag/reducer";
import {
  fetchCurrentUser,
  removeCurrentUser,
} from "../../../modules/user/reducer";
const useHome = () => {
  const [tabTag, setTabTag] = useState(false);
  const [activeTab, setActiveTab] = useState("yourTab");
  const [tagName, setTagName] = useState("");

  const isToken = checkToken();

  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);
  const tags = useSelector((state) => state.tags.tags);

  const handleTag = (tag) => {
    console.log(tag);
    setActiveTab("tagTab");
    setTagName(tag);
    setTabTag(true);
    dispatch(fetchAllArticle({ limit: 10, offset: 0, tag }));
  };
  const handleYourTab = () => {
    setTabTag(false);
    setActiveTab("yourTab");
    dispatch(fetchAllArticleYourFeed({ limit: 10, offset: 0 }));
  };
  const handleGlobalTab = () => {
    setTabTag(false);
    setActiveTab("globalTab");
    dispatch(fetchAllArticle({ limit: 10, offset: 0 }));
  };

  useEffect(() => {
    if (!isToken) {
      setActiveTab("globalTab");
      dispatch(fetchAllArticle({ limit: 10, offset: 0 }));
    } else {
      dispatch(fetchAllArticleYourFeed({ limit: 10, offset: 0 }));
    }
    dispatch(fetchAllTag());
  }, [isToken]);
  useEffect(() => {
    if (isToken) {
      dispatch(fetchCurrentUser());
    } else {
      dispatch(removeCurrentUser());
    }
  }, [isToken]);
  return {
    tags,
    tagName,
    tabTag,
    handleTag,
    activeTab,
    handleGlobalTab,
    handleYourTab,
    isToken,
    articles,
  };
};
export default useHome;
