import { createSlice } from "@reduxjs/toolkit";

export const UserDetailsSlice = createSlice({
  name: "UserDetails",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    setUserDetails(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { setUserDetails, logoutUser } = UserDetailsSlice.actions;

export default UserDetailsSlice.reducer;
