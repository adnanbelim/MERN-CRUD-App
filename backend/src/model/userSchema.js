const mongoose = require('mongoose');

//create schema of field...

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        require : true,
    },
    email: {
        type : String,
        require : true,
        unique: true,
    },
    age: {
        type : String,
        require : true,
    },
    mobile: {
        type : String,
        require : true,
        unique: true,
    },
    work: {
        type : String,
        require : true,
    },
    address: {
        type : String,
        require : true,
    },
    desc: {
        type : String,
        require : true,
    },
});

// create model of schema...
// model Name will be same as Collection Name 
 
const users = mongoose.model("users", userSchema);

module.exports = users;