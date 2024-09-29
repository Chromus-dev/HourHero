import { User } from '../models/User';

export async function createUser(u: any) {
	try {
		const user = new User(u);
		const dbsave = await user.save();

		return dbsave;
	} catch (error: any) {
		return { error };
	}
}

export async function getUserByEmail(e: string) {
	try {
		const user = await User.findOne({ email: e });

		return user;
	} catch (error) {
		return { error };
	}
}
