import { User } from '../models/User';

// import mongoose from 'mongoose';

export async function createUser(u: any) {
	try {
		// console.log(mongoose.connection.readyState);

		const user = new User(u);
		const dbsave = await user.save();
		// console.log(mongoose.connection.readyState);

		return dbsave;
	} catch (error: any) {
		return { error };
	}
}
