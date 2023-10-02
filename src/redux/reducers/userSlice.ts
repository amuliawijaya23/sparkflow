import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

export interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  picture: string;
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
    login: (state, action: PayloadAction<UserProfile>) => {
      state._id = action.payload._id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.emailVerified = action.payload.emailVerified;
      state.picture = action.payload.picture;
    },
  },
});

export const { logout, login } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
