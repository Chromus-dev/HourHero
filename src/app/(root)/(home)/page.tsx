'use client';

import Link from 'next/link';
import { auth } from '@lib/auth';
import { User } from '@lib/models/user.model';
// import { sendEmail } from '@utils/mail';

/**
 ** Main Homepage *
 ** if user is logged in,
 ** in the navbar have a button that says 'dashboard' otherwise,
 ** it is a 'sign in' button

 ** what HourHero is, why you should use it, etc
 ** basic launch page
 */

export default function Home() {
	// const testEmail = async (e: any) => {
	// 	e.preventDefault();

	// 	try {
	// 		await sendEmail(
	// 			'chasecrampton9@gmail.com',
	// 			'test',
	// 			'<p>hello world</p>'
	// 		);
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	const sendMessage = async (e: any) => {
		e.preventDefault();

		try {
			let subject = 'test';
			let message = '<p>hello world</p>';
			let email = 'chasecrampton9@gmail.com';

			const res = await fetch('/api/sendEmail', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					subject,
					message,
					email,
				}),
			});

			const data = await res.json();
			console.log(data);
			if (res.ok) {
				console.log('Email Sent');
				return true;
			} else {
				console.error('Email not sent');
				return false;
			}
		} catch (error) {
			console.log('Error sending email: ', error);
			//   toast.error(error?.message);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center m-4">
			<h1 className="text-3xl my-3">HourHero</h1>

			<p className="my-3">
				<Link href="/login" className="mx-2 underline">
					Sign In
				</Link>
			</p>

			<form onSubmit={sendMessage}>
				<button
					type="submit"
					className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
				>
					send an email
				</button>
			</form>
		</div>
	);
}
