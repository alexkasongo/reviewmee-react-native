import { createSlice } from "@reduxjs/toolkit";

export const AssignSlice = createSlice({
  name: "assign",
  initialState: {
    signees: [
      {
        key: 1,
        name: "Mark Doe",
        email: "mark@yahoo.com",
        image: "https://bootdey.com/img/Content/avatar/avatar7.png",
      },
      {
        key: 2,
        name: "Clark Man",
        email: "clark@yahoo.com",
        image: "https://bootdey.com/img/Content/avatar/avatar6.png",
      },
      {
        key: 3,
        name: "Jaden Boor",
        email: "jaden@yahoo.com",
        image: "https://bootdey.com/img/Content/avatar/avatar5.png",
      },
    ],
  },
  reducers: {
    addSignee: (state, action) => {
      state.signees = [
        ...state.signees,
        {
          key: action.payload.key,
          name: action.payload.name,
          email: action.payload.email,
        },
      ];
    },
    resetSignee: (state, action) => {
      console.log("resetSignee");
      state.signees = [];
    },
  },
});

export const { addSignee, resetSignee } = AssignSlice.actions;

export const selectAssignees = (state) => state.assign.signees;

export default AssignSlice.reducer;
