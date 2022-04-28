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
        const registerCollection = client.db('VolunteerNetwork').collection('register');
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

        // GET Data for Register user 
        // GET API 
        app.get("/register", async (req, res) => {
            const query = {};
            const cursor = registerCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })


        // POST API For register user 
        app.post("/register", async (req, res) => {
            const newUser = req.body;
            const result = await registerCollection.insertOne(newUser);
            res.send(result);
        });

        // DELETE Data for Register user 
        // DELETE API  

        app.delete('/register/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await registerCollection.deleteOne(query);
            res.send(result);
        })

        // UPDATE API 

        app.put('/register/:id', async (req, res) => {
            const id = req.params.id;
            const data = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    // same as userName and texData 
                    // ...data
                    fullName: data.fullName,
                    email: data.email,
                    date: data.date,
                    Desicription: data.Desicription,
                    organize: data.organize
                },
            };
            const result = await registerCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })

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


