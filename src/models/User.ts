import mongoose, { Schema } from 'mongoose';

export interface UserDocument {
	name: string;
	email: string;
	password: string;
}

const userSchema = new Schema<UserDocument>({
	name: {
		required: [true, 'Name is required'],
		type: String,
	},
	email: {
		required: [true, 'Email is required'],
		type: String,
		unique: true,
		match: [
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Email is invalid',
		],
	},
	password: {
		required: false,
		type: String,
	},
});

export const User =
	mongoose.models.User ?? mongoose.model<UserDocument>('User', userSchema);
