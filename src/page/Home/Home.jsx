import React from "react";
import { Link } from "react-router-dom";
import { checkToken } from "../../util/auth";
import useHome from "./hook/useHook";
import Tab from "./components/Tab";
import PopularTags from "./components/PopularTags";
export default function Home() {
  const {
    tags,
    tagName,
    tabTag,
    handleTag,
    activeTab,
    handleGlobalTab,
    handleYourTab,
    articles,
  } = useHome();

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {checkToken() && (
                  <li className="nav-item" onClick={handleYourTab}>
                    <Link
                      className={`nav-link ${
                        activeTab === "yourTab" ? "active" : ""
                      }`}
                      href=""
                    >
                      Your Feed
                    </Link>
                  </li>
                )}
                <li className="nav-item" onClick={handleGlobalTab}>
                  <Link
                    className={`nav-link ${
                      activeTab === "globalTab" ? "active" : ""
                    }`}
                  >
                    Global Feed
                  </Link>
                </li>
                <li className="nav-item" onClick={handleGlobalTab}>
                  {tabTag && (
                    <div className={`nav-link ${tabTag ? "active" : ""}`}>
                      <i className="ion-pound"></i> {tagName}
                    </div>
                  )}
                </li>
              </ul>
            </div>

            <Tab tagName={tagName} articles={articles} activeTab={activeTab} />
          </div>

          <PopularTags tags={tags} handleTag={handleTag} />
        </div>
      </div>
    </div>
  );
}
