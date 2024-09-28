const mongoose = require('mongoose');

function createDB(database){
    mongoose.connect('mongodb://localhost:27017/'+ database).catch(function(){ console.log('Error connecting to', database)})
}

module.exports = createDB;