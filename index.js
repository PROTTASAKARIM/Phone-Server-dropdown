const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://phoneCountry:Ng5tRvdf48zDvi5c@cluster0.zibap.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const inactiveData = client.db("phoneCountry").collection("inactive");
        const activeData = client.db("phoneCountry").collection("active");

        app.post('/activePost', async (req, res) => {
            const active = req.body;
            const result = await activeData.insertOne(active);
            res.send(result);
        })
        app.get('/activePost', async (req, res) => {
            const result = await activeData.find().toArray();
            res.send(result);
        })
        app.post('/inactivePost', async (req, res) => {
            const inactive = req.body;
            const result = await inactiveData.insertOne(inactive);
            res.send(result);
        })
        app.get('/inactivePost', async (req, res) => {
            const result = await inactiveData.find().toArray();
            res.send(result);
        })


    } finally {

    }
}

run().catch(console.dir);

app.get('/', (res, req) => {
    req.send("Program is running")
})
app.listen(port, () => {
    console.log("Listening to Phone Country")
})