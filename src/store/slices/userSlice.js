import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    roles: [],
  },
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.roles = action.payload.roles || [];
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.roles = [];
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
