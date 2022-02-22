const express = require('express');
const app = express()
const router = express.Router();
const mongoClient = require('mongodb').MongoClient
let db;
const url = 'mongodb+srv://ini:Kikalka1a2@cluster0.ndldf.mongodb.net/test';
mongoClient.connect(url, (err, client) => {
    if(err != null)
    {
        console.log(err.message);
        throw err;
    }
    db =  client.db('MyDB')
    console.log('connected to db')
})
app.listen(8000, () => {
    console.log('running')
})

router.route('/pokemon')
    .get((req, res) => {
        db.collection('pokemon').find(req.query).toArray(function (err, pokemon){
            res.json(pokemon)
        })
    })
    .post((req, res) => {
        console.log(req.query)
        var newUser = req.query 
        db.collection('pokemon').insert(newUser, function (err, pokemon){
            res.json(pokemon)
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

app.use('/api', router)

