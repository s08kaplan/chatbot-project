import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chat: [],
  loading: false,
  error: false,
  errorMessage: "",
  token: "",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = false;
    },

    getChats: (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.chat = payload?.data?.data
        console.log(payload);
    },

    fetchFail: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.errorMessage = payload?.response?.data?.message;
    },
    clearError: (state) => {
      state.error = false;
    },
  },
});

export const { fetchStart, getChats, fetchFail, clearError } = chatSlice.actions;

export default chatSlice.reducer;
