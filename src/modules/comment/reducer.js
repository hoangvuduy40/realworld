import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiComment } from "../../services/comment";

export const fetchAllComment = createAsyncThunk(
  "comments/getAllComment",
  async ({ slug }) => {
    const response = await apiComment.getAllComment({
      slug,
    });
    return response;
  }
);
export const reducerComment = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    isLoading: true,
  },
  reducers: {
    addComment: (state, { payload }) => {
      state.comments.unshift(payload.comment);
      return state;
    },
    removeCommentOfArticle: (state, { payload }) => {
      const comment = state.comments.filter(
        (comment) => comment.id === Number(payload)
      );
      state.comments.splice(state.comments.indexOf(...comment), 1);
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllComment.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllComment.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.comments = payload.comments;
    });
    builder.addCase(fetchAllComment.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export const { addComment, removeCommentOfArticle } = reducerComment.actions;
