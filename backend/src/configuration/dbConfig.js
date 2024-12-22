const mongoose = require('mongoose');

const connectMongo = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/CRUD');
        console.log('Connected MongoDB successfully');
        
    }
    catch(error){
        console.error('MongoDB not connected');
        
    }
}

module.exports = connectMongo;

// This is local connection through compass
// If we wanna global connection, we have to use Atlas