'use server';

import { signIn } from '@/app/auth';

export async function doSocialLogin(formData: any) {
	const action = formData.get('action');

	await signIn(action, { redirectTo: '/dashboard' });
}

export async function doLogout() {}
