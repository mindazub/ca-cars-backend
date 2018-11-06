const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// GET
router.get('/', async function(req, res) {

    const cars = await loadCarsConnection();
    res.send(await cars.find({}).toArray());
});

// SHOW
router.get('/:carId', async function(req, res) {
  
    res.json({
        message: `return car with ${req.params.carId}`
    });
});

// CREATE
router.post('/', async function(req, res) {
    const cars = await loadCarsConnection();    
    let newCar = {
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price,
        engine: req.body.engine,
        createdAt: new Date() // consider using new UTF date
    }

    await cars.insertOne(newCar, function(err, result){
        if(err){
            console.log(err);
            res.status(200).json({
                status: "error",
                error: err
            });
        }else{            
            console.log(result);
            res.status(201).json({
                status: "OK",
                message: `Car ${req.body.brand} ${req.body.model} was created`
            });
        }
    });
});

// DELETE


// UPDATE


// connect to db

async function loadCarsConnection() {
    const client = await mongodb.MongoClient.connect(
        'mongodb://mindazub:aaa000@ds143293.mlab.com:43293/carsdb', {
            useNewUrlParser: true
        }
    );
    return client.db('carsdb').collection('cars-collection');
}


//Export cars
module.exports = router;