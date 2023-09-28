import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '@redux/reducers/userSlice';
import authReducer from '@redux/reducers/authSlice';
import themeReducer from '@redux/reducers/themeSlice';

export const store = configureStore({
  reducer: { user: userReducer, auth: authReducer, theme: themeReducer },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
