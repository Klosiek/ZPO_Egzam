const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = new Schema({
    price: { type: Number, required: true },
    pizzaNames: { type: Array, required: true }
});

module.exports = orderSchema;