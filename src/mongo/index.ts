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
    // Connect the client to the server	(optional starting in v4.7)
    await mongo.connect();
    // Send a ping to confirm a successful connection
    await mongo.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } catch (e) {
    throw e;
  }
}

export const mongoDB = mongo.db('main');
