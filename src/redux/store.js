import { configureStore } from "@reduxjs/toolkit";
import { reducerUser } from "../modules/user/reducer";
import { reducerArticles } from "../modules/article/reducer";
import { reducerComment } from "../modules/comment/reducer";
import { reducerTag } from "../modules/tag/reducer";
import { reducerProfile } from "../modules/profile/reducer";

const store = configureStore({
  reducer: {
    users: reducerUser.reducer,
    tags: reducerTag.reducer,
    articles: reducerArticles.reducer,
    comments: reducerComment.reducer,
    profiles: reducerProfile.reducer,
  },
});

export default store;
