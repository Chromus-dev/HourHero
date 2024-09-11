import mongoose, { Schema, StringExpressionOperator } from 'mongoose';

interface UserI {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const userSchema = new Schema<UserI>({
	firstName: {
		required: true,
		type: String,
	},
	lastName: {
		required: true,
		type: String,
	},
	email: {
		required: true,
		type: String,
	},
	password: {
		required: true,
		type: String,
	},
});

export const User =
	mongoose.models.User ?? mongoose.model<UserI>('User', userSchema);
