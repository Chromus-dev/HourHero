export const LOGIN = '/login';
export const ROOT = '/';

// accessable if youre not logged in
export const PUBLIC_ROUTES = [
	'/login',
	'/register',
	'/api', // required for authentication to work
];

// only accessible if youre logged in, even if it starts with a public route
export const PROTECTED_SUB_ROUTES = [];
