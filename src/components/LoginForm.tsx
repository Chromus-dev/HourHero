'use client';

import SocialLogin from './SocialLogin';
import { doCredentialLogin } from '@/app/actions/userAuthentication';

import { useRouter } from 'next/navigation';

import { useState } from 'react';

const LoginForm = () => {
	const [error, setError] = useState('');
	const router = useRouter();

	async function handleFormSubmit(event: any) {
		event.preventDefault();

		try {
			const formData = new FormData(event.currentTarget);

			const response = await doCredentialLogin(formData);

			if (!!response.error) {
				setError(response.error.message);
			} else {
				router.push('/dashboard');
			}
		} catch (e) {
			console.error(e);
			setError('Check your credentials');
		}
	}

	return (
		<>
			<div className="text-xl text-red-500">{error}</div>
			<form
				className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
				onSubmit={handleFormSubmit}
			>
				<div className="my-2">
					<label htmlFor="email">Email Address</label>{' '}
					<input
						className="border mx-2 border-gray-500 rounded"
						type="email"
						name="email"
						id="email"
					/>
				</div>

				<div className="my-2">
					<label htmlFor="password">Password</label>
					<input
						className="border mx-2 border-gray-500 rounded"
						type="password"
						name="password"
						id="password"
					/>
				</div>
				<button
					type="submit"
					className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
				>
					Ceredential Login
				</button>
			</form>
			<SocialLogin />
		</>
	);
};

export default LoginForm;
