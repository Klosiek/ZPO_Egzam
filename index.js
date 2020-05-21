//@ts-check

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const connector = require('./connectionSetup');

const User = require('./Schemas/UserSchema');
const pizzaSchema = require('./Schemas/PizzaSchema');
const Order = require('./Schemas/OrderSchema');
const cors = require('cors');


const Pizza = mongoose.model('Pizza', pizzaSchema);

app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connector();

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/api/getAllPizzas', function (req, res) {
    Pizza.find().then(doc => {
        res.json({ items: doc })
    });
});

app.post('/api/addPizza', function (req, res) {
    const pizza = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        price: req.body.price
    };

    const pizzaData = new Pizza(pizza);
    pizzaData.save().then((res) => console.log(res));
    res.sendStatus(200);
});

app.post('/api/addUser', function (req, res) {
    const user = {
        username: req.body.username,
        password: req.body.password
    };

    const userData = new User(user);
    userData.save();
    console.log(req.body);
    res.sendStatus(201);
});

app.post('/api/client/addItem', function (req, res) {

    User.findOne({ username: req.body.username, password: req.body.password }).exec().then(doc => {
        const pizza = {
            name: req.body.name,
            ingredients: req.body.ingredients,
            price: req.body.price
        }
        const userOrder = doc.orders;

        userOrder.push(new Pizza(pizza));

        User.findOneAndUpdate({ username: req.body.username, password: req.body.password }, { orders: userOrder }).exec().then(doc => res.sendStatus(200));
    });

});

app.get('/api/client/getBasket', function (req, res) {
    User.findOne({ username: req.query.username, password: req.query.password }).then(doc => {
        res.send(doc);
    });
});

app.post('/api/client/applyOrder', function (req, res) {
    User.findOneAndUpdate({ username: req.body.username, password: req.body.password }, { orders: [] }).exec().then(doc => {
        res.sendStatus(200);
    });
});

app.post('/api/client/login', function (req, res) {
    const user = {
        username: req.body.username,
        password: req.body.password
    };

    User.findOne({ username: req.body.username, password: req.body.password }).exec().then(doc => { doc ? res.send(true) : res.send(false) });
});

app.post('/api/addPizza', function (req, res) {
    const pizza = {
        name: req.body.name,
        lastName: req.body.lastName,
        salary: req.body.salary
    };

    const userData = new User(pizza);
    userData.save();
    console.log(req.body);
    console.log(req.body);
    res.sendStatus(200);
});

app.listen(5000);