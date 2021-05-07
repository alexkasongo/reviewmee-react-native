import { createSlice } from "@reduxjs/toolkit";

export const PdfReaderSlice = createSlice({
  name: "pdfReader",
  initialState: {
    currentPdf: [],
  },
  reducers: {
    setCurrentPdf: (state, action) => {
      console.log(`Assign.js - 54 - ✅ you clicked me`, action.payload);
      state.currentPdf = action.payload;
    },
  },
});

export const { setCurrentPdf } = PdfReaderSlice.actions;

export const selectCurrentPdf = (state) => state.pdfReader.currentPdf;

export default PdfReaderSlice.reducer;
