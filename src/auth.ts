import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { User } from '@/models/User';
import bcrypt from 'bcryptjs';

import { authConfig } from '@/auth.config';
import { Provider } from 'next-auth/providers';

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
	// pages: {
	// 	signIn: '/signin',
	// },
});
