import { Link } from "react-router-dom";
import useFollow from "../hook/useFollow";
const ButtonFollow = ({ favorited, favoritesCount, author, slug }) => {
  const { user, removeArticle, handleFollow, handleHeart } = useFollow({
    slug,
    author,
  });
  return (
    <>
      {author.username === user.username ? (
        <span className="ng-scope">
          <Link
            className="btn btn-outline-secondary btn-sm mr-1"
            to={`/create-article/${slug}`}
          >
            <i className="ion-edit"></i> Edit Article
          </Link>

          <button
            className="btn btn-outline-danger btn-sm"
            onClick={removeArticle}
          >
            <i className="ion-trash-a"></i> Delete Article
          </button>
        </span>
      ) : (
        <>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handleFollow(author.following)}
          >
            <i className="ion-plus-round"></i>
            &nbsp;{" "}
            {author.following
              ? `Unfollow ${author.username}`
              : `Follow ${author.username}`}{" "}
            <span className="counter">(10)</span>
          </button>
          &nbsp;&nbsp;
          <button
            className={`btn btn-sm ${
              favorited ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handleHeart(slug, favorited)}
          >
            <i className="ion-heart"></i>
            &nbsp; {favorited ? "Unfavorite Post" : "Favortive Post"}{" "}
            <span className="counter">({favoritesCount})</span>
          </button>
        </>
      )}
    </>
  );
};
export default ButtonFollow;
