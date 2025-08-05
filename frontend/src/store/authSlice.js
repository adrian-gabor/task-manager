import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser as loginUserAPI, logoutUser } from '../api/loginUser';
import apiClient from '../api/apiClient';

// Async thunk dla logowania
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials) => {
    const response = await loginUserAPI(credentials);
    return response;
  }
);

// Async thunk dla sprawdzania tokenu
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    
    // Sprawdź czy token jest ważny
    const response = await apiClient.get('/auth/me');
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
    isInitialized: false,
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      logoutUser();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.loading = false;
        state.isInitialized = true;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.loading = false;
        state.isInitialized = true;
        logoutUser(); // Usuń nieprawidłowy token
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer; 