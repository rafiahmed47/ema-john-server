const express = require('express')
const cors = require('cors')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express()


app.use(cors())
app.use(express.json())
const port = 5000;



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s5ebb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
  try {
    await client.connect()
    const database = client.db('emajohn-service')
    const collection = database.collection('products')


    // POST ALL DATA
    // app.post('/addProduct', async (req, res) => {
    //   const docs = req.body;
    //   const options = { ordered: true }
    //   const result = await collection.insertMany(docs , options);
    //   console.log(`${result.insertedCount} documents were inserted`);
    // })

    // FIND API
    app.get('/products', async (req, res) => {
      const cursor = collection.find({})
      const products = await cursor.toArray()
      res.json(products)
    })

    
  } finally {
    // await client.close()
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port)

