import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

//  actions - dispatches/commits object
export const onUserLogin = ({ email, password }) => {
  return async (dispatch) => {
    try {
      // firebase
      const response = axios.post("URL", { email, password });

      dispatch({ type: "DO_LOGIN", payload: Response.data });
    } catch (error) {
      dispatch({ type: "ON_ERROR", payload: error });
    }
  };
};

export const signIn = ({ email, password }) => {
  return async (dispatch) => {
    try {
      //   const data = {
      //     data: [
      //       { name: "Macbook Pro", price: "$1500" },
      //       { name: "iPhone", price: "$999" },
      //       { name: "Nexus Pro", price: "$50" },
      //     ],
      //   };

      console.log(`index.js - 1 👀 ✅ 🔥`);

      dispatch({ type: "FETCH_PRODUCTS", payload: Response.data });
    } catch (error) {
      dispatch({ type: "ON_ERROR", payload: error });
    }
  };
};

// reducers - similar to mutations in vuex, used for storing the data in state
const userReducer = (state = {}, action) => {
  console.log(`index.js - 2 🙏🏾 🍎 we made it here!!!`);
  switch (action.payload) {
    case "DO_LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "ON_ERROR":
      return {
        ...state,
        appError: action.payload,
      };
    default:
      return {
        state,
      };
  }
};

// root reducer - combines multiple reducers into one single units
export const rootReducer = combineReducers({
  userReducer,
});

// store
export const store = createStore(rootReducer, applyMiddleware(thunk));
