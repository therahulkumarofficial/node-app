const mongoose = require('mongoose');
require('dotenv').config(); 
const MONGODB_URL = process.env.MONGODB_URL; // const mongoURL = process.env.DB_URL; // then i have to remove line number 7

// Define the MongoDB connection URL
// const mongoURL = 'mongodb://localhost:27017/hotels' // Replace 'mydatabase' with your database name
const mongoURL = MONGODB_URL 

// const mongoURL = process.env.MONGODB_URL_LOCAL;

// Set up MongoDB connection
mongoose.connect(mongoURL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true

})
// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection

db.on('connected', () => {
    console.log('Connected to MongoDB server');
    
})

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
})

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
})

// Export the database connection

module.exports = db;