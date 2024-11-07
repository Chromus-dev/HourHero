import { Lucia, SessionCookieOptions, TimeSpan } from 'lucia';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { adapter } from './adapter';

export const lucia = new Lucia(adapter, {
	sessionExpiresIn: new TimeSpan(30, 'd'), //cookies and session will expire in 30 days
	sessionCookie: {
		name: 'auth',
		attributes: {
			secure: process.env.NODE_ENV === 'production',
		},
	},
	getUserAttributes: (attributes) => attributes,
});

export const auth = cache(async () => {
	//@ts-ignore
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

	if (!sessionId) return { user: null, session: null };

	const { user, session } = await lucia.validateSession(sessionId);
	try {
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			//@ts-ignore
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}

		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			//@ts-ignore
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
	} catch (error) {}

	return { user, session };
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	role: 'user' | 'admin';
}
