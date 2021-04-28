import { createSlice } from "@reduxjs/toolkit";

export const contractSlice = createSlice({
  name: "contract",
  initialState: {
    contract: null,
    isLoading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setContract: (state, action) => {
      state.contract = action.payload;
    },
    loading: (state, action) => {
      //   do something here: we have access to action.payload
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, loading, signout, setUserDocs } = contractSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectSignedContract = (state) => state.contract.contract;

export default contractSlice.reducer;
