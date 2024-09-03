import { Collection, Db, Document, FindOptions } from 'mongodb';
import clientPromise from '.';

let client;
let db: Db;
let organizations: Collection<Document>;

export interface Organization {}

async function init() {
	if (db) return;

	try {
		client = await clientPromise;
		db = await client.db('sample_mflix');

		db.command({ ping: 1 });
		organizations = await db.collection('organizations');

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
 * API
 */

export async function getOrganizations(filter = {}, options: FindOptions = {}) {
	try {
		if (!organizations) await init();

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
