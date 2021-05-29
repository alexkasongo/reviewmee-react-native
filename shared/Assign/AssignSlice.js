import { createSlice } from "@reduxjs/toolkit";

export const AssignSlice = createSlice({
  name: "assign",
  initialState: {
    signees: [],
    signeesName: [],
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
      state.signeesName.push(action.payload.name);
    },
    closeModal: (state, action) => {
      // console.log(`Assign.js - 54 - ✅ `);
      state.modalStatus = action.payload;
    },
    removeSignee: (state, action) => {
      console.log(`AssignSlice.js - 28 - 💄`, action.payload);
      state.signees = action.payload;
      state.signeesName
        .splice(0, state.signeesName.length)
        .push(action.payload.name);
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
export const selectAssigneesName = (state) => state.assign.signeesName;
export const selectModalStatus = (state) => state.assign.modalStatus;

export default AssignSlice.reducer;
