import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiProfile } from "../../services/profile";
import { apiArticle } from "../../services/article";

export const fetchProfile = createAsyncThunk(
  "profile/getProfile",
  async ({ username }) => {
    const response = await apiProfile.getProfile({
      username,
    });
    return response;
  }
);

export const fetchMyArticle = createAsyncThunk(
  "profile/getMyArticle",
  async ({ limit, offset, author }) => {
    const response = await apiArticle.getMyArticle({
      limit: limit,
      offset: offset,
      author: author,
    });
    return response;
  }
);
export const fetchFavoritedArticle = createAsyncThunk(
  "profile/getFavoritedArticle",
  async ({ limit, offset, favorited }) => {
    const response = await apiArticle.getFavoritedArticle({
      limit: limit,
      offset: offset,
      favorited: favorited,
    });
    return response;
  }
);
export const reducerProfile = createSlice({
  name: "comment",
  initialState: {
    profile: {
      username: "",
      bio: "",
      image: "",
      following: false,
    },
    myArticle: [],
    favoritedArticle: [],
    articlesCount: 0,
    isLoadingProfile: true,
    isLoading: true,
  },
  reducers: {
    postProfileFavorited: (state, { payload }) => {
      if (payload.activeTab === "myTab") {
        if (state.myArticle[payload.index].favorited) {
          state.myArticle[payload.index].favoritesCount =
            state.myArticle[payload.index].favoritesCount - 1;
        } else {
          state.myArticle[payload.index].favoritesCount =
            state.myArticle[payload.index].favoritesCount + 1;
        }
        state.myArticle[payload.index].favorited =
          !state.myArticle[payload.index].favorited;
      } else {
        if (state.favoritedArticle[payload.index].favorited) {
          state.favoritedArticle[payload.index].favoritesCount =
            state.favoritedArticle[payload.index].favoritesCount - 1;
        } else {
          state.favoritedArticle[payload.index].favoritesCount =
            state.favoritedArticle[payload.index].favoritesCount + 1;
        }
        state.favoritedArticle[payload.index].favorited =
          !state.favoritedArticle[payload.index].favorited;
      }

      return state;
    },
    postProfileFollow: (state, _) => {
      state.profile.following = !state.profile.following;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoadingProfile = true;
      })
      .addCase(fetchProfile.fulfilled, (state, { payload }) => {
        state.isLoadingProfile = false;
        state.profile = payload.profile;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.isLoadingProfile = false;
      });
    builder
      .addCase(fetchMyArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyArticle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.myArticle = [...payload.articles];
        state.articlesCount = payload.articlesCount;
      })
      .addCase(fetchMyArticle.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchFavoritedArticle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoritedArticle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.favoritedArticle = [...payload.articles];
        state.articlesCount = payload.articlesCount;
      })
      .addCase(fetchFavoritedArticle.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { postProfileFavorited, postProfileFollow } =
  reducerProfile.actions;
