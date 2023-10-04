import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  picture: string;
  dateOfBirth?: Date;
  linkedIn?: string;
  instagram?: string;
  twitter?: string;
  github?: string;
}

const initialState: UserProfile = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  emailVerified: false,
  picture: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    login: (state, action: PayloadAction<UserProfile>) => action.payload,
  },
});

export const { logout, login } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
