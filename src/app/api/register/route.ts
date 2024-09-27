import { NextResponse } from 'next/server';
import { createUser } from '@/queries/users';
import { dbConnection } from '@/lib/mongo';

import bcrypt from 'bcryptjs';

export const POST = async (request: Request) => {
	const { name, email, password } = await request.json();

	// create DB connection
	await dbConnection();

	// encryt password
	const hashedPassword = await bcrypt.hash(password, 5);

	// form a DB payload
	const newUser = {
		name,
		password: hashedPassword,
		email,
	};

	// update the DB
	try {
		await createUser(newUser);
		console.log('created user', newUser);
	} catch (error: any) {
		return new NextResponse(error.message, {
			status: 500,
		});
	}

	return new NextResponse('User has been created', {
		status: 201,
	});
};
