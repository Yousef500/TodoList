import {MongoClient} from "mongodb";

let cachedClient = null;
let cachedDb = null;

export const connectToDatabase = async () => {
    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb
        }
    }

    let client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    let db = client.db("TodoList");

    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb
    }
}