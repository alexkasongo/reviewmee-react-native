import { createSlice } from "@reduxjs/toolkit";

export const AssignSlice = createSlice({
  name: "assign",
  initialState: {
    signees: [],
    signeesAdded: false,
  },
  reducers: {
    addSignee: (state, action) => {
      state.signees = [
        ...state.signees,
        {
          key: action.payload.key,
          name: action.payload.name,
          email: action.payload.email,
          image: action.payload.image,
        },
      ];
    },
    addedStatus: (state, action) => {
      state.signeesAdded = action.payload;
    },
    remvoveSignee: (state, action) => {
      state.signees = action.payload;
    },
    resetSignee: (state, action) => {
      console.log("resetSignee");
      state.signees = [];
    },
  },
});

export const {
  addSignee,
  addedStatus,
  remvoveSignee,
  resetSignee,
} = AssignSlice.actions;

export const selectAssignees = (state) => state.assign.signees;
export const selectAddedStatus = (state) => state.assign.signeesAdded;

export default AssignSlice.reducer;
