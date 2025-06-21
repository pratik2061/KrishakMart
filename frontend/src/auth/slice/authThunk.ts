import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAuthAxios } from "../../api/consumer/consumerAuth/auth";
import type { authSuccessTypes } from "../../types/authTypes";
import { toast } from "react-toastify";
import { api } from "../../api/authServices";

interface errorTypes {
  data: {
    message: string;
  };
}

interface verifyTokenErrorType {
  response: {
    data: {
      message: string;
    };
  };
}
export const verifyToken = async () => {
  try {
    const res = await api.get("/verify-session");
    return res.data;
  } catch (error) {
    const ErrorMessage = error as verifyTokenErrorType;
    return ErrorMessage.response.data.message;
  }
};

export const loginUser = createAsyncThunk(
  "/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = (await loginAuthAxios(email, password)) as {
        data: authSuccessTypes;
      };

      const data: authSuccessTypes = response.data;

      // Store only on success
      localStorage.setItem(
        "user_data",
        JSON.stringify({
          id: data.data.id,
          email: data.data.email,
          role: data.data.role,
        })
      );

      toast(`${data.message}`, {
        theme: "dark",
        type: "success",
        autoClose: 3000,
      });

      return {
        id: data.data.id,
        email: data.data.email,
        role: data.data.role,
      };
    } catch (error: unknown) {
      let ErrorMessage: errorTypes | undefined;

      if (typeof error === "object" && error !== null && "response" in error) {
        ErrorMessage = (error as { response: errorTypes }).response;
        // Reject properly
        return rejectWithValue(ErrorMessage.data.message);
      }

      return rejectWithValue("Something went wrong");
    }
  }
);
