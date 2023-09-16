import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

interface User {
  name: string;
  nickname: string;
  email: string;
  email_verified: boolean;
  picture: string;
  sid: string;
  sub: string;
  updated_at: string;
}

const initialState: User = {
  name: '',
  nickname: '',
  email: '',
  email_verified: false,
  picture: '',
  sid: '',
  sub: '',
  updated_at: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    login: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.picture = action.payload.picture;
      state.sid = action.payload.sid;
      state.sub = action.payload.sub;
      state.updated_at = action.payload.updated_at;
    },
  },
});

export const { logout, login } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
