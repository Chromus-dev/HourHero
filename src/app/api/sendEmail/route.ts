import { type NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@utils/mail';

export async function POST(req: NextRequest) {
	try {
		const { subject, message, email } = await req.json();

		// console.log(email, subject, message);
		// Send with gmail & Nodemailer

		console.log('send an email post');

		await sendEmail(email, subject, message);

		return NextResponse.json(
			{ message: 'Email Sent Successfully' },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: 'Failed to Send Email' },
			{ status: 500 }
		);
	}
}
