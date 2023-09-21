import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';
import { UserProfile } from '@auth0/nextjs-auth0/client';

const initialState: UserProfile = {
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
    login: (state, action: PayloadAction<UserProfile>) => {
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
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
