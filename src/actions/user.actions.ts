'use server';

import { UserProfile } from '@auth0/nextjs-auth0/client';
import dbConnect from '@lib/dbConnect';
import User from '@models/user.model';

export async function createUser(user: UserProfile): Promise<void> {
  await dbConnect();
  await User.create(user);
}
