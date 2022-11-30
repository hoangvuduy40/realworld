import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchArticle } from "../../../modules/article/reducer";
import { notificationFunction } from "../../../components/notification/notification";
import { fetchCurrentUser } from "../../../modules/user/reducer";
import { checkToken } from "../../../util/auth";
import { apiArticle } from "../../../services/article";
const useCreateArticle = () => {
  const { slug } = useParams();
  const isToken = checkToken();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { article } = useSelector((state) => state.articles);
  const [tagList, setTagList] = useState(() => {
    if (slug) {
      return article.tagList;
    }
    return [];
  });
  const { register, handleSubmit, setValue, getValues, resetField } = useForm();
  const handleSubmitForm = (dataForm) => {
    setLoading(true);
    const { title, description, body } = dataForm;
    const dataPush = { title, description, body, tagList };
    if (slug) {
      apiArticle
        .putArticles(dataPush, slug)
        .then((res) => {
          notificationFunction({ message: "Thành công", type: "success" });
          setLoading(false);
          navigate(`/article/${res.article.slug}`);
        })
        .catch((err) => {
          notificationFunction({ message: err, type: "error" });
          setLoading(false);
        });
    } else {
      apiArticle
        .postArticles(dataPush)
        .then((res) => {
          notificationFunction({ message: "Thành công", type: "success" });
          setLoading(false);
          navigate(`/article/${res.article.slug}`);
        })
        .catch((err) => {
          notificationFunction({ message: err, type: "error" });
          setLoading(false);
        });
    }
  };
  const handleTag = (e) => {
    if (e.code === "Enter") {
      const tagName = getValues("tag");
      if (tagList.includes(tagName)) {
        notificationFunction({
          message: "Bạn đã thêm hashtag vào Article của bạn rồi!",
          type: "warning",
        });
        e.preventDefault();
        return;
      } else if (tagName === "") {
        notificationFunction({
          message: "Hashtag không có nội dung!",
          type: "warning",
        });
        e.preventDefault();
        return;
      } else {
        resetField("tag");
        setTagList([...tagList, tagName]);
        e.preventDefault();
      }
    }
  };
  const removeTag = (tag) => {
    const newTagList = tagList.filter((tagName) => tagName !== tag);
    setTagList(newTagList);
  };
  useEffect(() => {
    if (slug) {
      dispatch(fetchArticle({ slug }));
    } else {
      setValue("title", "");
      setValue("description", "");
      setValue("body", "");
      setTagList([]);
    }
  }, [slug]);
  useEffect(() => {
    if (slug) {
      setValue("title", article.title);
      setValue("description", article.description);
      setValue("body", article.body);
      setTagList(article.tagList);
    } else {
      setValue("title", "");
      setValue("description", "");
      setValue("body", "");
      setTagList([]);
    }
  }, [article]);
  useEffect(() => {
    if (isToken) {
      dispatch(fetchCurrentUser());
    } else {
      navigate("/");
    }
  }, [isToken]);
  return {
    register,
    handleSubmit,
    handleSubmitForm,
    tagList,
    handleTag,
    removeTag,
    isLoading,
  };
};

export default useCreateArticle;
