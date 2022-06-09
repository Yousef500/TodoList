import mongoClient from "../mongoClient/mongoConnection";

const client = mongoClient;

export const listAllDbs = async () => {
  return await client.db().admin().listDatabases();
};
