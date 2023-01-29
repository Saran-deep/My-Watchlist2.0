import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/authSlice";
import createUsernameReducer from "../Features/Username/UsernameSlice";
import animeReducer from "../Features/Anime/animeSlice";
import homeSlice from "../Features/Home/homeSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    createUsername: createUsernameReducer,
    anime: animeReducer,
    home: homeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
