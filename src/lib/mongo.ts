import mongoose from 'mongoose';

export async function dbConnection() {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI!);
		return connection;
	} catch (error: any) {
		throw new Error(error);
	}
}
