import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalVisible: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalVisible: (state, action) => {
      console.log("slice", action.payload);
      state.modalVisible = action.payload;
    },
    test: (state) => {
      console.log("Click", state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setModalVisible, test } = modalSlice.actions;

export const selectModalState = (state) => state.modal.modalVisible;

export default modalSlice.reducer;
