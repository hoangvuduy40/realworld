import { Skeleton } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../util/auth";
import TabList from "./components/TabList";
import useProFile from "./hook/useProfile";
export default function Profile() {
  const {
    profiles,
    activeTab,
    handleFavoritedTab,
    handleMyTab,
    name,
    handleFollow,
  } = useProFile();
  const user = getUser();
  const { username, bio, image, following } = profiles.profile;
  if (profiles.isLoadingProfile) {
    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <Skeleton.Avatar />
                <br />
                <br />
                <Skeleton.Input />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <Link className="nav-link">My Articles</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link">Favorited Articles</Link>
                  </li>
                </ul>
              </div>

              <TabList name={name} activeTab={activeTab} profiles={profiles} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={image} className="user-img" alt={image} />
              <h4>{username}</h4>
              <p>{bio}</p>
              {username === user.username ? (
                <Link
                  className="btn btn-sm btn-outline-secondary action-btn"
                  to="/settings"
                >
                  <i className="ion-gear-a"></i> Edit Profile Settings
                </Link>
              ) : (
                <button
                  className="btn btn-sm btn-outline-secondary action-btn"
                  onClick={() => handleFollow(following)}
                >
                  <i className="ion-plus-round"></i>
                  &nbsp;{" "}
                  {following ? `Unfollow ${username}` : `Follow ${username}`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item" onClick={handleMyTab}>
                  <Link
                    className={`nav-link ${
                      activeTab === "myTab" ? "active" : ""
                    }`}
                    href=""
                  >
                    My Articles
                  </Link>
                </li>

                <li className="nav-item" onClick={handleFavoritedTab}>
                  <Link
                    className={`nav-link ${
                      activeTab === "favoritedTab" ? "active" : ""
                    }`}
                  >
                    Favorited Articles
                  </Link>
                </li>
              </ul>
            </div>

            <TabList name={name} activeTab={activeTab} profiles={profiles} />
          </div>
        </div>
      </div>
    </div>
  );
}
