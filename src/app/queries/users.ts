import { User } from '../model/user-model';

import mongoose from 'mongoose';

export async function createUser(u: any) {
	try {
		console.log(mongoose.connection.readyState);

		const user = new User(u);
		const dbsave = await user.save();
		console.log(mongoose.connection.readyState);

		console.log(dbsave);
	} catch (error: any) {
		throw new Error(error);
	}
}
