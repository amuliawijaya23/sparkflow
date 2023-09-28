import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

export interface UserProfile {
  _id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  picture: string;
}

interface Auth {
  user: UserProfile;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: Auth = {
  user: {
    _id: '',
    username: '',
    email: '',
    emailVerified: false,
    picture: '',
  },
  loading: false,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    login: (state, action: PayloadAction<UserProfile>) => {
      state.user._id = action.payload._id;
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
      state.user.emailVerified = action.payload.emailVerified;
      state.user.picture = action.payload.picture;
      state.isAuthenticated = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { logout, login, setLoading } = authSlice.actions;
export const selectAuthentication = (state: RootState) => state.auth;
export default authSlice.reducer;
