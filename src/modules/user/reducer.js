import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiUser } from "../../services/user";
export const fetchUpdateCurrentUser = createAsyncThunk(
  "user/updateCurrentUser",
  async (body) => {
    const response = await apiUser.updateCurrentUser(body);
    return response;
  }
);
export const fetchCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    const response = await apiUser.getCurrentUser();
    return response;
  }
);
export const reducerUser = createSlice({
  name: "user",
  initialState: {
    currentUser: {
      email: "",
      username: "",
      bio: "",
      image: "",
      password: "",
    },
    isLoading: false,
  },
  reducers: {
    removeCurrentUser: (state) => {
      state.currentUser = {};
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdateCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUpdateCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentUser = payload.user;
      })
      .addCase(fetchUpdateCurrentUser.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentUser = payload.user;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
export const { removeCurrentUser } = reducerUser.actions;
