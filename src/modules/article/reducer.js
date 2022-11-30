import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiArticle } from "../../services/article";
export const fetchAllArticle = createAsyncThunk(
  "article/getAllArticle",
  async ({ limit, offset, tag }) => {
    const response = await apiArticle.getArticles({
      limit: limit,
      offset: offset,
      tag: tag,
    });
    return response;
  }
);
export const fetchAllArticleYourFeed = createAsyncThunk(
  "article/getAllArticleYourFeed",
  async ({ limit, offset }) => {
    const response = await apiArticle.getArticleYourFeed({
      limit: limit,
      offset: offset,
    });
    return response;
  }
);
export const fetchArticle = createAsyncThunk(
  "article/getArticle",
  async ({ slug }) => {
    const response = await apiArticle.getArticle({
      slug,
    });
    return response;
  }
);
const initialState = {
  article: {
    slug: "",
    title: "",
    description: "",
    body: "",
    tagList: [],
    createdAt: "",
    updatedAt: "",
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "",
      bio: "",
      image: "",
      following: false,
    },
  },
  articlesCount: 0,
  articles: [],
  articlesYourFeed: [],
  isLoading: false,
};
export const reducerArticles = createSlice({
  name: "article",
  initialState,
  reducers: {
    postFavorited: (state, { payload }) => {
      if (payload.activeTab === "globalTab") {
        if (state.articles[payload.index].favorited) {
          state.articles[payload.index].favoritesCount =
            state.articles[payload.index].favoritesCount - 1;
        } else {
          state.articles[payload.index].favoritesCount =
            state.articles[payload.index].favoritesCount + 1;
        }
        state.articles[payload.index].favorited =
          !state.articles[payload.index].favorited;
      } else {
        if (state.articlesYourFeed[payload.index].favorited) {
          state.articlesYourFeed[payload.index].favoritesCount =
            state.articlesYourFeed[payload.index].favoritesCount - 1;
        } else {
          state.articlesYourFeed[payload.index].favoritesCount =
            state.articlesYourFeed[payload.index].favoritesCount + 1;
        }
        state.articlesYourFeed[payload.index].favorited =
          !state.articlesYourFeed[payload.index].favorited;
      }

      return state;
    },
    postDetailFavorited: (state, _) => {
      if (state.article.favorited) {
        state.article.favoritesCount = state.article.favoritesCount - 1;
      } else {
        state.article.favoritesCount = state.article.favoritesCount + 1;
      }

      state.article.favorited = !state.article.favorited;
      return state;
    },
    postFollow: (state, _) => {
      state.article.author.following = !state.article.author.following;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllArticle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.articles = [...payload.articles];
        state.articlesCount = payload.articlesCount;
      })
      .addCase(fetchAllArticle.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchAllArticleYourFeed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllArticleYourFeed.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.articlesYourFeed = [...payload.articles];
        state.articlesCount = payload.articlesCount;
      })
      .addCase(fetchAllArticleYourFeed.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.article = payload.article;
      })
      .addCase(fetchArticle.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { postFavorited, postDetailFavorited, postFollow } =
  reducerArticles.actions;
