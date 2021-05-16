import { createSlice } from "@reduxjs/toolkit";

export const AssignSlice = createSlice({
  name: "assign",
  initialState: {
    signees: [],
    modalStatus: false,
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
    closeModal: (state, action) => {
      // console.log(`Assign.js - 54 - ✅ you clicked me`, action.payload);
      state.modalStatus = action.payload;
    },
    removeSignee: (state, action) => {
      state.signees = action.payload;
    },
    resetSignee: (state, action) => {
      console.log("resetSignee");
      state.signees = [];
    },
  },
});

export const { addSignee, closeModal, removeSignee, resetSignee } =
  AssignSlice.actions;

export const selectAssignees = (state) => state.assign.signees;
export const selectModalStatus = (state) => state.assign.modalStatus;

export default AssignSlice.reducer;
