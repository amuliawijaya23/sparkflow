'use server';

import dbConnect from '@lib/dbConnect';
import User from '@models/user.model';
import bcrypt from 'bcryptjs';

export interface UserData {
  username: string;
  email: string;
  emailVerified: boolean;
  picture: string;
  password: string;
}

export interface UserDB {
  _id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  password: string;
  picture: string;
  updatedAt: Date;
  createdAt: Date;
  __v: number;
}

export async function getUsers() {
  await dbConnect();
  try {
    const users = await User.find({});
    const userList = users.map((u) => ({
      ...u._doc,
      _id: u._id.toString(),
    }));
    return userList;
  } catch (error) {
    throw new Error(`An error occured while fetching users: ${error}`);
  }
}

export async function createUser(user: UserData): Promise<void> {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  await dbConnect();

  try {
    await User.create({
      username: user.username.toLocaleLowerCase(),
      email: user.email.toLocaleLowerCase(),
      emailVerified: user.emailVerified,
      picture: user.picture,
      password: hashedPassword,
    });
  } catch (error) {
    throw new Error(`An error occured while registering user: ${error}`);
  }
}

export async function findUser(
  email: string | null | undefined,
): Promise<string | undefined> {
  await dbConnect();

  try {
    const user = await User.findOne({ email });

    if (user) {
      const id = user._doc._id.toString();
      return JSON.stringify({ _id: id, ...user._doc });
    }
  } catch (error) {
    throw new Error(`An error occured while fetching user data: ${error}`);
  }
}
