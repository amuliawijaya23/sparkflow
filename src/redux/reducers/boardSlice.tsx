import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

export interface BoardProfile {
  _id: string;
  name: string;
  team: string[];
  user: string;
  logo: string;
  createdAt: Date;
  updatedAt: Date;
}

const initialState: BoardProfile[] = [];

export const boardSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    updateBoards: (state, action: PayloadAction<BoardProfile[]>) =>
      action.payload,
  },
});

export const { updateBoards } = boardSlice.actions;
export const selectBoards = (state: RootState) => state.boards;
export default boardSlice.reducer;
