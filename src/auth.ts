import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { User } from '@/models/User';
import { verify } from '@node-rs/argon2';

import { authConfig } from '@/auth.config';
import { Provider } from 'next-auth/providers';
import { createUser, getUserByEmail } from '@/queries/users';

const providers: Provider[] = [
	GoogleProvider({
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	}),
	CredentialsProvider({
		credentials: {
			email: { label: 'Email', type: 'email' },
			password: { label: 'Password', type: 'password' },
		},
		async authorize(credentials) {
			if (credentials === null) return null;

			try {
				const user = await User.findOne({
					email: credentials?.email,
				});

				if (user) {
					const isMatch = await verify(
						user?.password,
						credentials.password as string,
						{
							memoryCost: 19456,
							timeCost: 2,
							outputLen: 32,
							parallelism: 1,
						}
					);

					if (isMatch) return user;
					else throw new Error('Check your password');
				}
			} catch (error) {
				throw new Error('User not found');
			}
		},
	}),
];

// export const providerMap = providers
// 	.map((provider) => {
// 		if (typeof provider === 'function') {
// 			const providerData = provider();
// 			return { id: providerData.id, name: providerData.name };
// 		} else {
// 			return { id: provider.id, name: provider.name };
// 		}
// 	})
// 	.filter((provider) => provider.id !== 'credentials');

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
	//@ts-ignore
} = NextAuth({
	...authConfig,
	providers,
	callbacks: {
		async signIn({ user, account }) {
			// if its a google signin, see if were already in the DB and if not lets get in there
			if (account?.provider === 'google') {
				//@ts-ignore - promise we'll have an email
				let dbUser = await getUserByEmail(user?.email);

				if (dbUser !== null) return true; // yippie we already got a user in there

				dbUser = await createUser({
					name: user.name,
					email: user.email,
				});

				return true;
			} else {
				return true;
			}
		},
	},
	// pages: {
	// 	signIn: '/signin',
	// },
});
