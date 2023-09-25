'use server';

import dbConnect from '@lib/dbConnect';
import User from '@models/user.model';

export async function createUser(): Promise<void> {
  dbConnect();
}
