const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const connectMongo = require('./configuration/dbConfig');
const userSchema = require('./model/userSchema'); // If unused here, you can remove it
const cors = require('cors');
const router = require('./routes/router');

// Middleware setup
app.use(cors());
app.use(express.json());

// Use router middleware (add this line)
app.use('/api', router); // Adjust '/api' to your desired base path

// Connect to MongoDB and start the server
connectMongo().then(() => {
    app.listen(PORT, (err) => {
        if (err) throw Error;
        console.log(`Server running on PORT ${PORT}`);
    });
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
