'use server';
import mongoose from 'mongoose';
import dbConnect from '@lib/dbConnect';
import Board from '@models/board.model';

export interface BoardData {
  name: string;
  team: [string?];
  owner: string;
}

export const createBoard = async (data: BoardData) => {
  await dbConnect();
  const ownerId = new mongoose.Types.ObjectId(data.owner);

  Board.create({
    name: data.name,
    team: [],
    owner: ownerId,
  });
};
