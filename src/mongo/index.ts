import { MongoClient, ServerApiVersion } from 'mongodb';
const uri =
  'mongodb+srv://sososka2804:PkwUuhX1m7FYglkZ@cluster0.cwkfhyr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const mongo = new MongoClient(uri, {
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
