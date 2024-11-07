import nodemailer from 'nodemailer';

//! migrate to nodemailer so I can use gmail
// https://www.youtube.com/watch?app=desktop&v=oujAYWgYwtM&sttick=0
// https://github.com/zinotrust/nextjs-email-tutorial/blob/master/app/api/sendEmail/route.js

const domain = process.env.NEXT_PUBLIC_BASE_URL;

export const sendEmail = async (
	email: string,
	subject: string,
	html: string
) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			host: process.env.EMAIL_HOST,
			port: 587,
			secure: true,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const mailOption = {
			from: process.env.EMAIL_USER,
			to: email,
			subject: subject,
			html: html,
		};

		await transporter.sendMail(mailOption);
	} catch (err) {
		console.error(err);
	}
};

// Send verification email
export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${domain}/new-verification?token=${token}`;

	await sendEmail(
		email,
		'Verify your email address',
		`<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
	);
};

// Send password reset email
export const sendPasswordResetmail = async (email: string, token: string) => {
	const resetLink = `${domain}/new-password?token=${token}`;

	await sendEmail(
		email,
		'Reset your password',
		`<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
	);
};

// Send two factor token
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
	await sendEmail(email, '2FA Code', `<p>Your 2FA code is: ${token}</p>`);
};
