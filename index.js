const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// user: Rasel 
// pass: oHflcCt1rWndUVs4


const uri = "mongodb+srv://Rasel:oHflcCt1rWndUVs4@cluster0.xltkx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const volunteerNetwork = client.db('VolunteerNetwork').collection('events');
        // GET API 
        // http://localhost:5000/events
        app.get('/events', async (req, res) => {
            const query = {};
            const cursor = volunteerNetwork.find(query);
            const events = await cursor.toArray({});
            res.send(events);
        })

        // POST API 
        // http://localhost:5000/events
        app.post("/events", async (req, res) => {
            const newEvent = req.body;
            const result = await volunteerNetwork.insertOne(newEvent);
            res.send(result);
        })
        // UPDATE API 

        // DELETE 

        app.delete('/events/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await volunteerNetwork.deleteOne(query);
            res.send(result);

        })

    }
    finally {

    }
}
run().catch(console.dir)




app.get('/', (req, res) => {
    res.send("Running Volunteer Network");
});

app.listen(port, () => {
    console.log("Lisening port", port);
})


