import { Link } from "react-router-dom";
import { formatDate } from "../../../util/formatDate";
import useComment from "../hook/useComment";
import { Skeleton } from "antd";
const Comment = ({ slug }) => {
  const {
    isToken,
    user,
    register,
    handleSubmit,
    postComment,
    comments,
    removeComment,
  } = useComment({ slug });
  if (comments.isLoading) {
    return (
      <div className="row">
        <div className="col-xs-12 col-md-8 offset-md-2">
          <Skeleton avatar paragraph={{ rows: 4 }} />
        </div>
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-xs-12 col-md-8 offset-md-2">
        {!isToken ? (
          <p>
            <Link to="/login">Sign in</Link> or{" "}
            <Link to="/register">sign up</Link> to add comments on this article.
          </p>
        ) : (
          <form
            className="card comment-form"
            onSubmit={handleSubmit(postComment)}
          >
            <div className="card-block">
              <textarea
                className="form-control"
                placeholder="Write a comment..."
                rows="3"
                {...register("comment")}
              ></textarea>
            </div>
            <div className="card-footer">
              <img
                src={user.image}
                className="comment-author-img"
                alt={user.image}
              />
              <button className="btn btn-sm btn-primary" type="submit">
                Post Comment
              </button>
            </div>
          </form>
        )}

        {comments.comments.map(({ author, body, createdAt, id }) => {
          return (
            <div className="card" key={id}>
              <div className="card-block">
                <p
                  className="card-text"
                  dangerouslySetInnerHTML={{ __html: body }}
                ></p>
              </div>
              <div className="card-footer">
                <Link
                  to={`/profile/@${author.username}`}
                  className="comment-author"
                >
                  <img
                    src={author.image}
                    className="comment-author-img"
                    alt={author.image}
                  />
                </Link>
                &nbsp;
                <Link
                  to={`/profile/@${author.username}`}
                  className="comment-author"
                >
                  {author.username}
                </Link>
                <span className="date-posted">{formatDate(createdAt)}</span>
                {author.username === user.username && (
                  <span
                    className="mod-options"
                    onClick={() => removeComment(id)}
                  >
                    <i className="ion-trash-a"></i>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
