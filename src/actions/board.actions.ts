'use server';
import mongoose from 'mongoose';
import dbConnect from '@lib/dbConnect';
import Board from '@models/board.model';

export interface BoardData {
  name: string;
  team: string[];
  user: string;
  logo: string;
}

export const createBoard = async (data: BoardData) => {
  await dbConnect();
  const userId = new mongoose.Types.ObjectId(data.user);

  const team: [mongoose.Types.ObjectId?] = [];

  if (data?.team.length > 0) {
    for (const u of data.team) {
      team.push(new mongoose.Types.ObjectId(u));
    }
  }
  Board.create({
    name: data.name,
    team: team,
    user: userId,
    logo: data.logo,
  });
};
