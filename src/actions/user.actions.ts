'use server';

import dbConnect from '@lib/dbConnect';
import User from '@models/user.model';
import bcrypt from 'bcryptjs';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  picture: string;
  password: string;
}

export interface UserDB {
  _id: string;
  firstName: string;
  lastName: string;
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

  const data = {
    firstName: `${user.firstName[0].toUpperCase()}${user.firstName
      .substring(1)
      .toLocaleLowerCase()}`,
    lastName:
      user.lastName.length < 1
        ? ''
        : user.lastName.length > 1
        ? `${user.lastName[0].toUpperCase()}${user.lastName
            .substring(1)
            .toLocaleLowerCase()}`
        : user.lastName.toUpperCase(),

    email: user.email.toLocaleLowerCase(),
    emailVerified: user.emailVerified,
    picture: user.picture,
    password: hashedPassword,
  };

  console.log('DATA: ', data);

  try {
    await User.create(data);
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
