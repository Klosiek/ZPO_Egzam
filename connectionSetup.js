const mongoose = require('mongoose');

async function connector() {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0-hbt02.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: false
    }).then(sucess => console.log("Connection sucess"), error => console.log("Connection lost"));
}

module.exports = connector;
