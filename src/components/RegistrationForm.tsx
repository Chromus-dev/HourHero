'use client';

import { useState } from 'react';
import SocialLogin from './SocialLogin';

import { useRouter } from 'next/navigation';

const RegistrationForm = () => {
	const [error, setError] = useState('');
	const router = useRouter();

	async function handleSubmit(event: any) {
		event.preventDefault();

		try {
			const formData = new FormData(event.currentTarget);

			const name = formData.get('name');
			const email = formData.get('email');
			const password = formData.get('password');

			const response = await fetch(`/api/register`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});

			if (response.statusText === 'userAlreadyExists')
				setError('A user with that email already exists');
			else response.status === 201 && router.push('/');
		} catch (e: any) {
			console.error(e.message);
		}
	}

	return (
		<>
			<div className="text-xl text-red-500">{error}</div>
			<form
				className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
				onSubmit={handleSubmit}
			>
				<div className="my-2">
					<label htmlFor="email">Name</label>{' '}
					<input
						className="border mx-2 border-gray-500 rounded"
						type="text"
						name="name"
						id="name"
					/>
				</div>

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
					Create Account
				</button>
			</form>
			<SocialLogin />
		</>
	);
};

export default RegistrationForm;
