import nextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import { NextAuthOptions } from 'next-auth';

import dbConnect from '@lib/dbConnect';
import { findUser } from '@actions/user.actions';
import { compare } from 'bcryptjs';

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const NEXTAUTH_JWT_SECRET = process.env.NEXTAUTH_JWT_SECRET;

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await findUser(credentials?.email);

        if (user === undefined) {
          throw new Error('Email is not registered.');
        }

        const isPasswordMatch = await compare(
          credentials!.password,
          user['password'],
        );

        if (!isPasswordMatch) {
          throw new Error('Password is incorrect.');
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: { secret: NEXTAUTH_JWT_SECRET },
  secret: NEXTAUTH_SECRET,
};

export const handler = nextAuth(authOptions);
export { handler as GET, handler as POST };
