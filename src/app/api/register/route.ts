import { NextResponse } from 'next/server';
import { createUser } from '@/queries/users';
import { dbConnection } from '@/lib/mongo';

import { hash } from '@node-rs/argon2';

export const POST = async (request: Request) => {
	const { name, email, password } = await request.json();

	// create DB connection
	await dbConnection();

	// encryt password
	const hashedPassword = await hash(password, {
		// recommended minimum parameters
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	// form a DB payload
	const newUser = {
		name,
		password: hashedPassword,
		email,
	};

	// update the DB
	try {
		const res = await createUser(newUser);

		// error code 11000 is duplicate key (email) meaning account already exists
		if (res?.error?.code == 11000) {
			return new NextResponse(res.error.errorResponse.errmsg, {
				status: 500,
				statusText: 'userAlreadyExists',
			});
		}

		if (res.error) throw res.error;
	} catch (error: any) {
		return new NextResponse(error.errorResponse.errmsg, {
			status: 500,
		});
	}

	return new NextResponse('User has been created', {
		status: 201,
	});
};
