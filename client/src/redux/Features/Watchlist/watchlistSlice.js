import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeAPICall from "../../../Utils/makeAPICall";

const initialState = {
  watchlist: null,
  status: false,
  isLoading: false,
  error: null,
  animeAdded: false,
  animeRemoved: false,
};

export const getUserWatchList = createAsyncThunk(
  "watchlist/getWatchlist",
  async (thunkAPI) => {
    try {
      const response = await makeAPICall({
        method: "get",
        url: "/watchlist/get-watchlist",
      });
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const addToWatchlist = createAsyncThunk(
  "watchlist/addToWatchlist",
  async (data, thunkAPI) => {
    try {
      const response = await makeAPICall({
        method: "post",
        url: "/watchlist/add-to-watchlist",
        data,
      });
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const deleteFromWatchlist = createAsyncThunk(
  "watchlist/deleteFromWatchlist",
  async (data, thunkAPI) => {
    try {
      const response = await makeAPICall({
        method: "delete",
        url: "/watchlist/delete-from-watchlist",
        data,
      });
      return response;
    } catch (err) {
      if (!err.response) {
        throw err;
      }
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

const watchlistSlice = createSlice({
  name: "user-watchlist",
  reducers: {
    resetShowNotification(state) {
      state.animeAdded = false;
      state.animeRemoved = false;
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserWatchList.pending, (state, actions) => {
        state.isLoading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(getUserWatchList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.status = "succeeded";
        state.watchlist = payload.data.watchList;
      })
      .addCase(getUserWatchList.rejected, (state, { payload, error }) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = payload ? payload.data.message : error.message;
      })
      .addCase(addToWatchlist.pending, (state, actions) => {
        state.isLoading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(addToWatchlist.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.status = "succeeded";
        state.watchlist = payload.data.watchList;
        state.animeAdded = true;
      })
      .addCase(addToWatchlist.rejected, (state, { payload, error }) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = payload ? payload.data.message : error.message;
      })
      .addCase(deleteFromWatchlist.pending, (state, actions) => {
        state.isLoading = true;
        state.error = null;
        state.status = "loading";
      })
      .addCase(deleteFromWatchlist.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.status = "succeeded";
        state.watchlist = payload.data.watchList;
        state.animeRemoved = true;
      })
      .addCase(deleteFromWatchlist.rejected, (state, { payload, error }) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = payload ? payload.data.message : error.message;
      });
  },
});

export const { resetShowNotification } = watchlistSlice.actions;

export const usersWatchList = (state) => state.watchlist.watchlist;
export const loadingState = (state) => state.watchlist.isLoading;

export default watchlistSlice.reducer;
