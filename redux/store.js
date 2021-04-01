import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../redux/reducers/userReducer";
import firebaseReducer from "../firebase/firebaseSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    firebase: firebaseReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
