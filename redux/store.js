import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../redux/reducers/userReducer";

export default configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
