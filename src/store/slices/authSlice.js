import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import endpoints from "../../api/endpoints";
import { extractError } from "../utils";

const storedUser = (() => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
})();

const persistAuth = (token, user) => {
  if (token) {
    localStorage.setItem("token", token);
  }

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

const clearAuthStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const pickToken = (data) => {
  if (!data) return null;
  if (typeof data === "string" && data.length > 10) return data;

  return (
    data.token ||
    data.accessToken ||
    data.jwtToken ||
    data.jwt ||
    data.data?.token ||
    data.result?.token ||
    null
  );
};

const pickUser = (data, username) =>
  data?.user ||
  data?.data?.user ||
  data?.result?.user || {
    username,
    name: data?.userName || data?.username || username,
    role: data?.role || "User",
  };

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endpoints.LOGIN, {
        email,
        password,
      });

      const payload = response.data;

      if (payload?.success === false) {
        return rejectWithValue(payload?.message || "Login failed.");
      }

      const token = pickToken(payload);

      if (!token) {
        return rejectWithValue(
          payload?.message || "Login succeeded but no token was returned."
        );
      }

      return {
        token,
        user: pickUser(payload, email),
      };
    } catch (error) {
      return rejectWithValue(extractError(error) || "Login failed.");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endpoints.REGISTER, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(extractError(error) || "Registration failed.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    user: storedUser,
    loading: false,
    error: "",
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = "";
      clearAuthStorage();
    },
    clearAuthError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        persistAuth(action.payload.token, action.payload.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed.";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed.";
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
