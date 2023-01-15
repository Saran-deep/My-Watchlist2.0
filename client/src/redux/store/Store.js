import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/Auth/authSlice";
import createUsernameReducer from "../Features/Username/UsernameSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    createUsername: createUsernameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
