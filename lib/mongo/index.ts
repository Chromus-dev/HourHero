import { MongoClient } from 'mongodb';

const URI = process.env.MONGO_URI;
const options = {};

if (!URI) throw new Error('No Mongo URI in .env');

let client = new MongoClient(URI, options);
let clientPromise: Promise<MongoClient>;

declare global {
	namespace globalThis {
		var _mongoClientPromise: Promise<MongoClient>;
	}
}

clientPromise = client.connect();

if (process.env.NODE_ENV !== 'production') {
	if (!global._mongoClientPromise) {
		global._mongoClientPromise = clientPromise;
	}
}

//@ts-ignore
export default clientPromise;
