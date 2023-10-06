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
  await Board.create({
    name: data.name,
    team: team,
    user: userId,
    logo: data.logo,
  });
};

export const getBoards = async (id: string) => {
  await dbConnect();
  const user_id = new mongoose.Types.ObjectId(id);

  const myBoards = await Board.find({
    $or: [{ user: user_id }, { team: user_id }],
  });

  const boardData = myBoards.map((b) => ({
    ...b._doc,
    _id: b._doc._id.toString(),
    team: b._doc.team.map((t: mongoose.Types.ObjectId) => t.toString()),
    user: b._doc.user.toString(),
  }));

  return boardData;
};
