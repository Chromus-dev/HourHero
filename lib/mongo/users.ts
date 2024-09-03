import { Collection, Db, Document, FindOptions } from 'mongodb';
import clientPromise from '.';

let client;
let db: Db;
let users: Collection<Document>;

export interface User {
	type: 'Member' | 'Advisor';
	id: Number;
	name: String;
	email: String;
	organizations: Array<String>; // array of organization IDs
}

async function init() {
	if (db) return;

	try {
		client = await clientPromise;
		db = await client.db('sample_mflix');

		db.command({ ping: 1 });
		users = await db.collection('users');
		console.log('successfully connected to and pinged hourhero db');
	} catch (error) {
		// @ts-ignore
		throw new Error(error);
	}
}

(async () => {
	await init();
})();

/**
		users = await db.collection('users');
 * API
 */

export async function getUsers(filter = {}, options: FindOptions = {}) {
	try {
		if (!users) await init();

		const result = await users
			.find({})
			.limit(20)
			.map((user) => ({ ...user, _id: user._id.toString() }))
			.toArray();

		return { users: result };
	} catch (error) {
		return { error: 'failed to fetch users ' };
	}
}

export async function createUser(user: User) {}
