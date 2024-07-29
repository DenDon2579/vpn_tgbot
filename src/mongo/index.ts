import { MongoClient, ServerApiVersion } from 'mongodb';
import { MONGO } from '../params';

const mongo = new MongoClient(MONGO, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function startMongo() {
  try {
    await mongo.connect();

    await mongo.db('admin').command({ ping: 1 });
    console.log('MONGO STARTED');
  } catch (e) {
    throw e;
  }
}

export const mongoDB = mongo.db('main');
