import { NextRequest, NextResponse } from 'next/server';
import { authConfig } from '@/auth.config';
import NextAuth from 'next-auth';

//@ts-ignore
const { auth } = NextAuth(authConfig);
import { PUBLIC_ROUTES, LOGIN, ROOT, PROTECTED_SUB_ROUTES } from '@/lib/routes';

export async function middleware(request: NextRequest) {
	// console.log('middleware');

	const { nextUrl } = request;

	// check if authenticted
	const session = await auth();
	// console.log('auth session', session);

	const isAuthenticated = !!session?.user;
	// console.log('is authenticated?', isAuthenticated, nextUrl.pathname);

	// check if its a public route
	const isPublicRoute =
		(PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) ||
			nextUrl.pathname === ROOT) &&
		!PROTECTED_SUB_ROUTES.find((route) => nextUrl.pathname.includes(route));

	// get logged in boy

	// maybe show error on login page saying you need to login?
	if (!isAuthenticated && !isPublicRoute)
		return NextResponse.redirect(new URL(LOGIN, request.url));

	// return NextResponse.next();
}

export const config = {
	// dont even ask me what this regex does
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
