import mongoose from 'mongoose';

const connectDB = async () => {
	if (mongoose.connection.readyState >= 1) return;

	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI as string);

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

export default connectDB;
