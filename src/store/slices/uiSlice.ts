import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isLoading: boolean;
  // could add dark mode here
}

const initialState: UiState = {
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = uiSlice.actions;
export default uiSlice.reducer;
