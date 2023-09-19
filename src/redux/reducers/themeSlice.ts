import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

interface Theme {
  mode: string;
}

const initialState: Theme = {
  mode: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode === 'light' ? (state.mode = 'dark') : (state.mode = 'light');
    },
  },
});

export const { toggleMode } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme.mode;
export default themeSlice.reducer;
