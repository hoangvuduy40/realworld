import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { checkToken } from "../../util/auth";

export default function Header() {
  const isAccess = checkToken();
  const user = useSelector((state) => state.users.currentUser);
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right flex-row ">
          <li className="nav-item">
            <NavLink className="nav-link" to="/" activeclassname="active">
              Home
            </NavLink>
          </li>
          {isAccess ? (
            <>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/create-article"
                  activeclassname="active"
                >
                  <i className="ion-compose"></i>&nbsp;New Article
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/settings"
                  activeclassname="active"
                >
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/profile/@${user.username}`}
                  activeclassname="active"
                >
                  <img
                    className="user-pic"
                    src={user.image}
                    alt="profile"
                  ></img>
                  &nbsp;
                  {user.username}
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/login"
                  activeclassname="active"
                >
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/register"
                  activeclassname="active"
                >
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
