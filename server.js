let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.MONGODB_URI;
let port = process.env.port || 3000;
let collection;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        depreflowerionErrors: true,
    }
});


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Flower');
        console.log(collection);
    } catch(ex) {
        console.error(ex);
    }
}


app.get('/api/flowers', (req,res) => {
    getAllflowers((err,result)=>{
        if (!err) {
            res.json({statusCode:200, data:result, message:'Beautiful Flower'});
        }
    });
});

app.post('/api/flower', (req,res)=>{
    let flower = req.body;
    postFlower(flower, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'Success'});
        }
    });
});

function postFlower(flower,callback) {
    collection.insertOne(flower,callback);
}

function getAllflowers(callback){
    collection.find({}).toArray(callback);
}

app.listen(port, ()=>{
    runDBConnection();
});