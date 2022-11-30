import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiArticle } from "../../services/article";
export const fetchAllTag = createAsyncThunk("tag/getAllTag", async () => {
  const response = await apiArticle.getTags();
  return response;
});
const initialState = {
  tags: [],
  isLoading: true,
};
export const reducerTag = createSlice({
  name: "tag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllTag.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllTag.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.tags = [...payload.tags];
    });
    builder.addCase(fetchAllTag.rejected, (state, { payload }) => {
      state.isLoading = false;
    });
  },
});
