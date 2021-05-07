import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../redux/reducers/userReducer";
import firebaseReducer from "../firebase/firebaseSlice";
import contractReducer from "../contracts/contractSlice";
import AssignSliceReducer from "../shared/Assign/AssignSlice";
import PdfReaderSliceReducer from "../shared/pdfReader/pdfReaderSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    firebase: firebaseReducer,
    contract: contractReducer,
    assign: AssignSliceReducer,
    pdfReader: PdfReaderSliceReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
