import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState: {
    user: {
      id: "",
      userCode: "",
      fullName: "",
      email: "",
    },
    role: {
      id: "",
      roleCode: "",
      roleName: "",
    },
    vendor: {
      id: "",
      vendorCode: "",
      vendorName: "",
      branch: {
        id: "",
        branchCode: "",
        branchName: "",
      },
    },
    isAuthenticated: false,
    isAuthChecked: false,
  },
  reducers: {
    setUserDetails(state, action) {
      var result = action.payload;

      ((state.user = {
        id: result?.id || "",
        userCode: result?.userCode || "",
        fullName: result?.fullName || "",
        email: result?.email || "",
      }),
        (state.role = {
          id: result?.roleID || "",
          roleCode: result?.role || "",
          roleName: result?.roleFullName || "",
        }),
        (state.vendor = {
          id: result?.vendorID || "",
          vendorCode: result?.vendorCode || "",
          vendorName: result?.vendorName || "",
          branch: {
            id: result?.branchID || "",
            branchCode: result?.vendorBranchCode || "",
            branchName: result?.vendorBranch || "",
          },
        }),
        (state.isAuthenticated = true));
    },
    logoutUser(state) {
      ((state.user = {
        id: "",
        userCode: "",
        fullName: "",
        email: "",
      }),
        (state.role = {
          id: "",
          roleCode: "",
          roleName: "",
        }),
        (state.vendor = {
          id: "",
          vendorCode: "",
          vendorName: "",
          branch: {
            id: "",
            branchCode: "",
            branchName: "",
          },
        }),
        (state.isAuthenticated = false));
    },

    setAuthChecked(state, action) {
      state.isAuthChecked = action.payload;
    },
  },
});

export const { setUserDetails, logoutUser, setAuthChecked } = UserSlice.actions;

export default UserSlice.reducer;
