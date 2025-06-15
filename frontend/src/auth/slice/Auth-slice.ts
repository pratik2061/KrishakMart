import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunk";

const existingUserData = localStorage.getItem("user_data");
const parsedUserData = existingUserData ? JSON.parse(existingUserData) : {};

interface state {
  userData:
    | {
        id: number;
        email: string;
        role: string;
      }
    | { message: string }
    | undefined
    | null;
  status: string;
  error: string | null;
}
const initialState: state = {
  userData: parsedUserData,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.userData = null;
      localStorage.removeItem("user_data");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userData = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = "error";
        state.error = "Login failed";
        state.userData = null;
        localStorage.removeItem("user_data");
      });
  },
});

export const {logoutUser}= authSlice.actions

export default authSlice.reducer;
