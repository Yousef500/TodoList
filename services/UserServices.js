import MongoClient from "../mongoClient/mongoConnection";

export const listAllDbs = async () => {
    const client = await MongoClient
    return await client.db().admin().listDatabases()
}