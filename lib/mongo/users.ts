import type { Collection, Db, Document, FindOptions } from 'mongodb';
import clientPromise from '.';

let client;
let db: Db;
let users: Collection<Document>;

export interface UserOrg {
	_id: String;
	events: Array<String>; // array of event IDs
	hours: Number; // sum of hours from events
}

export interface User {
	type: 'Member' | 'Advisor';
	name: String;
	email: String;
	organizations: Array<UserOrg>; // array of organization IDs
}

async function init() {
	if (db) return;

	try {
		client = await clientPromise;
		db = await client.db('hourhero');

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
			// .limit(20)
			.map((user) => ({ ...user, _id: user._id.toString() }))
			.toArray();

		return { users: result };
	} catch (error) {
		return { error: 'failed to fetch users' };
	}
}

export async function createUser(user: User) {
	try {
		if (!users) await init();

		const result = await users.insertOne(user);

		console.log(`user inserted with _id: ${result.insertedId}`);
		return { _id: result.insertedId };
	} catch (error) {
		console.error(error);
		return { error: 'failed to create new user' };
	}
}
