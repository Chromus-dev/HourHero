'use client';

import SocialLogin from './SocialLogin';

import { useRouter } from 'next/navigation';

const RegistrationForm = () => {
	const router = useRouter();

	async function handleSubmit(event: any) {
		event.preventDefault();

		try {
			const formData = new FormData(event.currentTarget);

			const firstName = formData.get('firstName');
			const lastName = formData.get('lastName');
			const email = formData.get('email');
			const password = formData.get('password');

			const response = await fetch(`/api/register`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					firstName,
					lastName,
					email,
					password,
				}),
			});

			response.status === 201 && router.push('/');
		} catch (e: any) {
			console.error(e.message);
		}
	}

	return (
		<>
			<form
				className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md"
				onSubmit={handleSubmit}
			>
				<div className="my-2">
					<label htmlFor="email">First Name</label>{' '}
					<input
						className="border mx-2 border-gray-500 rounded"
						type="text"
						name="firstName"
						id="firstName"
					/>
				</div>
				<div className="my-2">
					<label htmlFor="email">Last Name</label>{' '}
					<input
						className="border mx-2 border-gray-500 rounded"
						type="text"
						name="lastName"
						id="lastName"
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
					Register
				</button>
			</form>
			<SocialLogin />
		</>
	);
};

export default RegistrationForm;
