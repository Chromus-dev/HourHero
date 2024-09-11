import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { User } from './model/user-model';
import bcrypt from 'bcryptjs';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	session: {
		strategy: 'jwt',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			//@ts-ignore
			async authorize(credentials) {
				if (credentials === null) return null;

				try {
					const user = await User.findOne({
						email: credentials?.email,
					});

					if (user) {
						const isMatch = await bcrypt.compare(
							credentials.password as string,
							user.password
						);

						if (isMatch) return user;
						else throw new Error('Check your password');
					}
				} catch (error) {
					throw new Error('User not found');
				}
			},
		}),
	],
});
