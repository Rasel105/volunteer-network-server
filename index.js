const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// user: Rasel 
// pass: oHflcCt1rWndUVs4


const uri = "mongodb+srv://Rasel:oHflcCt1rWndUVs4@cluster0.xltkx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    // GET API 

    // POST API 
    
    // UPDATE API 

    // DELETE 
} 
run().catch(console.dir)




app.get('/', (req, res) => {
    res.send("Running Volunteer Network");
});

app.listen(port, () => {
    console.log("Lisening port", port);
})


