import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./reducers/RootReducer";

// store
export const store = createStore(rootReducer, applyMiddleware(thunk));
