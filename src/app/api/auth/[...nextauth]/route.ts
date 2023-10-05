import nextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextAuthOptions, User } from 'next-auth';
import { findUser } from '@actions/user.actions';
import { compare } from 'bcryptjs';

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

interface Credentials {
  email: string;
  password: string;
}

interface MyUser extends User {
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

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt', maxAge: 12 * 60 * 60 },
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as Credentials;

        try {
          const userData = await findUser(email);

          if (!userData) {
            return null;
          }

          const user = JSON.parse(userData);
          const isMatch = await compare(password, user.password);
          if (!isMatch) {
            return null;
          }

          return user as MyUser;
        } catch (error) {
          throw new Error(`An error occured while signing in: ${error}`);
        }
      },
    }),
  ],
};

export const handler = nextAuth(authOptions);
export { handler as GET, handler as POST };
