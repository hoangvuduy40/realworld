import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../util/formatDate";
import useArticle from "./hook/useArticle";
import Comment from "./components/Comment";
import ButtonFollow from "./components/ButtonFollow";
import { Skeleton } from "antd";
import { marked } from "marked";
export default function Article() {
  const { articles } = useArticle();
  const {
    author,
    createdAt,
    title,
    body,
    tagList,
    favoritesCount,
    favorited,
    slug,
  } = articles.article;
  const renderer = {
    image(href) {
      return `
      <div class="text-center">
       <img src="${href}" class="rounded" alt="${href}" style="width:75%">
      </div>
      `;
    },
    table(header, body) {
      return `<table class="table">
               <thead>${header}</thead>
               <tbody>${body}</tbody>
              </table>`;
    },
    code(code) {
      return `<pre class="bg-light d-block p-3 overflow-auto">      
                <code >${code}</code>
              </pre>
              `;
    },
  };
  marked.use({ renderer });
  if (articles.isLoading) {
    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <Skeleton />
            <Skeleton.Avatar />
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <Skeleton />
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <Skeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{title}</h1>

          <div className="article-meta">
            <Link to={`/profile/@${author.username}`}>
              <img src={author.image} alt={author.image} />
            </Link>
            <div className="info">
              <Link to={`/profile/@${author.username}`} className="author">
                {author.username}
              </Link>
              <span className="date">{formatDate(createdAt)}</span>
            </div>
            <ButtonFollow
              favorited={favorited}
              favoritesCount={favoritesCount}
              author={author}
              slug={slug}
            />
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p dangerouslySetInnerHTML={{ __html: marked.parse(body) }}></p>
          </div>
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
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <Link to={`/profile/@${author.username}`}>
              <img src={author.image} alt={author.image} />
            </Link>
            <div className="info">
              <Link to={`/profile/@${author.username}`} className="author">
                {author.username}
              </Link>
              <span className="date">{formatDate(createdAt)}</span>
            </div>
            <ButtonFollow
              favorited={favorited}
              favoritesCount={favoritesCount}
              author={author}
              slug={slug}
            />
          </div>
        </div>

        <Comment slug={slug} />
      </div>
    </div>
  );
}
