const express = require('express');
const app = express()
const router = express.Router();
const mongoClient = require('mongodb').MongoClient
const cors = require('cors');
let db;

router.use(cors());
app.use(cors());
const url = 'mongodb+srv://ini:Kikalka1a2@cluster0.ndldf.mongodb.net/test';
mongoClient.connect(url, (err, client) => {
    if(err != null)
    {
        console.log(err.message);
        throw err;
    }
    db =  client.db('vineyard')
    console.log('connected to db')
})
app.listen(8000, () => {
    console.log('running')
})
// humidity, temperature, battery percentage,(gps), time?????? device id? 
router.route('/vineyard')
    .get((req, res) => {
        console.log("read");
        db.collection('readings').find({temp : { $lt: 100}}, {projection: {temp: 1, humidity: 1}}).toArray(function (err, readings){//req.query).toArray(function (err, readings){
            console.log(readings)
            res.json(readings)
        })
    })
    .post((req, res) => {
        console.log(req.query)
        var newReading = req.query 
        db.collection('readings').insert(newReading, function (err, readings){
            res.json(readings)
        })
    })

router.route('/pokemon/:id')
    .get((req, res) => {
        db.collection('pokemon').find(req.params).toArray(function (err, pokemon){
            res.json(pokemon)
        })
    })
    .put((req, res) => {
        console.log(req.params)
        console.log(req.body)
        key = { '_id': ObjectId(req.params.id) }
        db.collection('pokemon').update(key, req.body, function (err, result){
            res.end(result)
        })
    })
    .delete((req, res) => {
        key = { '_id': ObjectId(req.params.id) }
        db.collection('pokemon').deleteOne(key, function (err, pokemon){
            res.json(pokemon)
        })
    })
app.use('/api', router);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
    
