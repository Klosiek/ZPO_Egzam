const mongoose = require('mongoose');
const Pizza = require('./PizzaSchema');
const Schema = mongoose.Schema;


const orderSchema = new Schema({
    time: Number,
    price: { type: Number, required: true },
    pizzas: [Pizza]
});

module.exports = orderSchema;