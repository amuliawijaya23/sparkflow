'use server';
import mongoose from 'mongoose';
import dbConnect from '@lib/dbConnect';
import Board from '@models/board.model';

export interface BoardData {
  name: string;
  team: [string?];
  user: string;
  logo: string;
}

export const createBoard = async (data: BoardData) => {
  await dbConnect();
  const userId = new mongoose.Types.ObjectId(data.user);

  let team: [string?] = [];

  if (data?.team.length > 0) {
    team = data.team;
  }

  Board.create({
    name: data.name,
    team: team,
    user: userId,
    logo: '',
  });
};
