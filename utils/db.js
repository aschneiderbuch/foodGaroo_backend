import { MongoClient } from "mongodb";

const URL = process.env.MONGO_URL;
const DB = process.env.MONGO_DB;

const client = new MongoClient(URL);

let db;

export const getDB = async () => {
	if (db) return db;
	else {
		await client.connect();
		db = client.db(DB);
		return db;
	}
};
