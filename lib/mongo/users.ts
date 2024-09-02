import { Collection, Db, Document, MongoClient } from 'mongodb';
import clientPromise from '.';

let client;
let db: Db;
let users: Collection<Document>;

async function init() {
	if (db) return;

	try {
		client = await clientPromise;
		db = await client.db('sample_mflix');
		users = await db.collection('users');
	} catch (error) {
		// @ts-ignore
		throw new Error(error);
	}
}

(async () => {
	await init();
})();

/**
 * USERS
 */

export async function getUsers() {
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
