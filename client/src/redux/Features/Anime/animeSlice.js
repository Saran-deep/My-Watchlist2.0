import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import makeAPICall from "../../../Utils/makeAPICall";

const initialState = {
  animeDetails: null,
  status: false,
  isLoading: false,
  error: null,
};

export const getAnime = createAsyncThunk(
  "anime/getAnime",
  async (animeId, thunkAPI) => {
    try {
      const response = await makeAPICall({
        method: "get",
        url: `/anime/get-anime/${animeId}`,
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

const animeSlice = createSlice({
  name: "anime",
  initialState,
  reducers: {
    resetState(state, actions) {
      state.animeDetails = null;
      state.error = null;
      state.status = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAnime.pending, (state, actions) => {
        state.isLoading = true;
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAnime.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.animeDetails = payload.data.animeDetails;
      })
      .addCase(getAnime.rejected, (state, { payload, error }) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = payload ? payload.data.message : error.message;
      });
  },
});

export const selectAnimeDetails = (state) => state.anime.animeDetails;
export const { resetState } = animeSlice.actions;
export default animeSlice.reducer;
