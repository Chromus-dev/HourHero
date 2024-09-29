'use server';

import { signIn, signOut } from '@/auth';

export async function doSocialLogin(formData: any) {
	const action = formData.get('action');

	await signIn(action, { redirectTo: '/dashboard' });
}

export async function doLogout() {
	await signOut({ redirectTo: '/' });
}

export async function doCredentialLogin(formData: FormData) {
	try {
		console.log('trying to do credential login');

		const response = await signIn('credentials', {
			email: formData.get('email'),
			password: formData.get('password'),
			redirect: false,
		});

		return response;
	} catch (err) {
		throw new Error(err as any);
	}
}
