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
    throw new Error(`An error occured when registering user: ${error}`);
  }
}
