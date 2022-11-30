import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  removeCommentOfArticle,
} from "../../../modules/comment/reducer";
import { apiComment } from "../../../services/comment";
import { getUser, checkToken } from "../../../util/auth";

const useComment = ({ slug }) => {
  const isToken = checkToken();
  const user = getUser();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments);

  const { register, handleSubmit, resetField } = useForm({
    mode: "onChange",
    defaultValues: {
      comment: "",
    },
  });
  const postComment = async ({ comment }) => {
    resetField("comment");
    const listComments = await apiComment.postComment({ slug, data: comment });
    dispatch(addComment(listComments));
  };
  const removeComment = async (id) => {
    await apiComment.deleteComment({ slug, id });
    dispatch(removeCommentOfArticle(id));
  };
  return {
    postComment,
    removeComment,
    register,
    handleSubmit,
    comments,
    isToken,
    user,
  };
};
export default useComment;
