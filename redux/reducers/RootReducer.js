import { combineReducers } from "redux";
import { userReducer } from "./UserReducers";

// root reducer - combines multiple reducers into one single units
export const rootReducer = combineReducers({
  userReducer,
});
