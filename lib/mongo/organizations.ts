import type { Collection, Db, Document, FindOptions } from 'mongodb';
import clientPromise from '.';

let client;
let db: Db;
let organizations: Collection<Document>;

export interface Organization {
	_id: String;
	name: String;
	memebers: Array<String>; // array if member ids
	advisors: Array<String>; // array of advisor ids
	events: Array<String>; // array of event ids
}

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

		const result = await organizations
			.find({})
			.limit(20)
			.map((org) => ({ ...org, _id: org._id.toString() }))
			.toArray();

		return { organizations: result };
	} catch (error) {
		return { error: 'failed to fetch orgs ' };
	}
}

export async function createOrganization(org: Organization) {}
