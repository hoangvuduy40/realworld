import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchFavoritedArticle,
  fetchMyArticle,
  fetchProfile,
  postProfileFollow,
} from "../../../modules/profile/reducer";
import { checkToken } from "../../../util/auth";
import { apiProfile } from "../../../services/profile";
import {
  fetchCurrentUser,
  removeCurrentUser,
} from "../../../modules/user/reducer";

const useProFile = () => {
  const isToken = checkToken();
  const { slug } = useParams();
  const navigate = useNavigate();
  const name = slug.slice(1);
  const [activeTab, setActiveTab] = useState("myTab");
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profiles);
  const handleMyTab = () => {
    setActiveTab("myTab");
    dispatch(fetchMyArticle({ author: name }));
  };
  const handleFavoritedTab = () => {
    setActiveTab("favoritedTab");
    dispatch(fetchFavoritedArticle({ favorited: name }));
  };
  const handleFollow = (follow) => {
    if (isToken) {
      dispatch(postProfileFollow());
      if (follow) {
        apiProfile.unFollow(name);
      } else {
        apiProfile.follow(name);
      }
    } else {
      navigate("/login");
    }
  };
  useEffect(() => {
    dispatch(fetchProfile({ username: name }));
    dispatch(fetchMyArticle({ author: name }));
  }, [name]);
  useEffect(() => {
    if (isToken) {
      dispatch(fetchCurrentUser());
    } else {
      dispatch(removeCurrentUser());
    }
  }, [isToken]);
  return {
    profiles,
    activeTab,
    handleMyTab,
    handleFavoritedTab,
    name,
    handleFollow,
  };
};
export default useProFile;
