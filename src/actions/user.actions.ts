'use server';

import dbConnect from '@lib/dbConnect';
import User from '@models/user.model';
import bcrypt from 'bcryptjs';

export interface User {
  username: string;
  email: string;
  email_verified: boolean;
  password: string;
}

export async function createUser(user: User): Promise<void> {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  await dbConnect();

  try {
    await User.create({
      username: user.username.toLocaleLowerCase(),
      email: user.email.toLocaleLowerCase(),
      email_verified: user.email_verified,
      password: hashedPassword,
    });
  } catch (error) {
    throw new Error(`An error occured while registering user: ${error}`);
  }
}

export async function findUser(email: string): Promise<void> {
  await dbConnect();

  try {
    const user = await User.findOne({ email }).select('_id');

    if (user) {
      const id = user._id.toString();
      return id;
    }
    return;
  } catch (error) {
    throw new Error(`An error occured while fetching user data: ${error}`);
  }
}
