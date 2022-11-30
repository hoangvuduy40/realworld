import { Link } from "react-router-dom";
import { Skeleton, Pagination } from "antd";
import { formatDate } from "../../../util/formatDate";
import useTab from "../hook/useTab";

const Tab = ({ articles, activeTab, tagName }) => {
  const { handleHeart, onChangePage, pagination } = useTab({
    tagName,
    activeTab,
  });
  const dataArticle =
    activeTab === "yourTab" ? articles.articlesYourFeed : articles.articles;
  if (articles.isLoading) {
    return (
      <div className="article-preview">
        <Skeleton />
      </div>
    );
  }
  return (
    <>
      {dataArticle.length === 0 ? (
        <div className="article-preview">No articles are here... yet.</div>
      ) : (
        dataArticle.map(
          (
            {
              author,
              createdAt,
              favoritesCount,
              title,
              description,
              tagList,
              favorited,
              slug,
            },
            index
          ) => {
            return (
              <div className="article-preview" key={index}>
                <div className="article-meta">
                  <Link to={`/profile/@${author.username}`}>
                    <img src={author.image} alt={author.image} />
                  </Link>
                  <div className="info">
                    <Link
                      to={`/profile/@${author.username}`}
                      className="author"
                    >
                      {author.username}
                    </Link>
                    <span className="date">{formatDate(createdAt)}</span>
                  </div>
                  <button
                    className={`btn ${
                      favorited ? "btn-primary" : "btn-outline-primary"
                    } btn-sm pull-xs-right`}
                    onClick={() => handleHeart(slug, index, favorited)}
                  >
                    <i className="ion-heart"></i> {favoritesCount}
                  </button>
                </div>
                <Link to={`/article/${slug}`} className="preview-link">
                  <h1>{title}</h1>
                  <p>{description}</p>
                  <span>Read more...</span>
                  <ul className="tag-list">
                    {tagList.map((tagList) => {
                      return (
                        <li
                          key={tagList}
                          className="tag-default tag-pill tag-outline ng-binding ng-scope"
                          ng-repeat="tag in $ctrl.article.tagList"
                        >
                          {tagList}
                        </li>
                      );
                    })}
                  </ul>
                </Link>
              </div>
            );
          }
        )
      )}
      {articles.articlesCount < pagination.pageSize ? (
        <></>
      ) : (
        <Pagination
          onChange={onChangePage}
          defaultPageSize={pagination.pageSize}
          total={articles.articlesCount}
          defaultCurrent={pagination.page}
        />
      )}
    </>
  );
};
export default Tab;
