import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../redux/reducers/userReducer";
import firebaseReducer from "../firebase/firebaseSlice";
import contractReducer from "../contracts/contractSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    firebase: firebaseReducer,
    contract: contractReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
