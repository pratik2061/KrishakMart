import { createSlice } from "@reduxjs/toolkit";
 import { loginFarmer } from "./farmerAuthThunk";

const existingFarmerData = localStorage.getItem("farmer_data");
const parsedFarmerData = existingFarmerData ? JSON.parse(existingFarmerData) : {};

interface state {
  farmerData:
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
  farmerData: parsedFarmerData,
  status: "idle",
  error: null,
};

export const farmerAuthSlice = createSlice({
  name: "farmerAuth",
  initialState,
  reducers: {
    logoutFarmer: (state) => {
      state.farmerData = null;
      localStorage.removeItem("farmer_data");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginFarmer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginFarmer.fulfilled, (state, action) => {
        state.status = "success";
        state.farmerData = action.payload;
      })
      .addCase(loginFarmer.rejected, (state) => {
        state.status = "error";
        state.error = "Login failed";
        state.farmerData = null;
        localStorage.removeItem("farmer_data");
      });
  },
});

export const {logoutFarmer}= farmerAuthSlice.actions

export default farmerAuthSlice.reducer;
