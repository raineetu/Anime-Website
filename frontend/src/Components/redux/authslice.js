import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Load from localStorage if available
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Persist user data
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user'); // Clear user data
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;



