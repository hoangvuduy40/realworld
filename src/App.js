import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layouts from "./layouts";
import PageError500 from "./page/PageError";
import NotFound from "./page/PageError/NotFound";
const Home = React.lazy(() => import("./page/Home"));
const Article = React.lazy(() => import("./page/Article"));
const CreateArticle = React.lazy(() => import("./page/CreateArticle"));
const Login = React.lazy(() => import("./page/Login"));
const Register = React.lazy(() => import("./page/Register"));
const Profile = React.lazy(() => import("./page/Profile"));
const Setting = React.lazy(() => import("./page/Settings"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layouts />}>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<>...</>}>
                <Home />
              </React.Suspense>
            }
          />
          <Route
            path="/profile/:slug"
            element={
              <React.Suspense fallback={<>...</>}>
                <Profile />
              </React.Suspense>
            }
          />
          <Route
            path="/settings"
            element={
              <React.Suspense fallback={<>...</>}>
                <Setting />
              </React.Suspense>
            }
          />
          <Route
            path="/create-article/*"
            element={
              <React.Suspense fallback={<>...</>}>
                <CreateArticle />
              </React.Suspense>
            }
          >
            <Route path=":slug" element={<CreateArticle />} />
          </Route>
          <Route
            path="/article/:slug"
            element={
              <React.Suspense fallback={<>...</>}>
                <Article />
              </React.Suspense>
            }
          />
          <Route
            path="/login"
            element={
              <React.Suspense fallback={<>...</>}>
                <Login />
              </React.Suspense>
            }
          />
          <Route
            path="/register"
            element={
              <React.Suspense fallback={<>...</>}>
                <Register />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="/500" element={<PageError500 />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
