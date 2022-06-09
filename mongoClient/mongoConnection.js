import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

async function run() {
  try {
    await client.connect();
    return client;
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
export default run().catch(console.dir);
