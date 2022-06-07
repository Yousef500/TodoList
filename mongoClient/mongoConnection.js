import {MongoClient} from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export default (async function () {
    try {
        await client.connect();
        return client
    } catch (e) {
        console.error(e)
    }
}());
