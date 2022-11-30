import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { notificationFunction } from "../../../components/notification/notification";
import {
  fetchCurrentUser,
  fetchUpdateCurrentUser,
} from "../../../modules/user/reducer";
import { getUser, checkToken } from "../../../util/auth";

const useFormProfile = () => {
  const user = useSelector((state) => state.users.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const isToken = checkToken();
  const userLocal = getUser();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      image: user.image || userLocal.image,
      username: user.username || userLocal.username,
      bio: user.bio || userLocal.bio,
      email: user.email || userLocal.email,
    },
  });

  const handleUpdateProfile = (data) => {
    setIsLoading(true);
    const { username, image, bio, password, email } = data;
    let body = {};
    if (password === "") {
      body = { username, image, bio, email };
    } else {
      body = { username, image, bio, email, password };
    }
    dispatch(fetchUpdateCurrentUser(body)).then(({ payload }) => {
      setIsLoading(false);
      notificationFunction({ message: "Thành công", type: "success" });
      localStorage.setItem("user", JSON.stringify(payload.user));
      navigate(`/profile/@${username}`);
    });
  };
  useEffect(() => {
    if (isToken) {
      dispatch(fetchCurrentUser());
    } else {
      navigate("/");
    }
  }, [isToken]);
  return { register, handleSubmit, handleUpdateProfile, errors, isLoading };
};

export default useFormProfile;
