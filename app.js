const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

//mongodb url stored in dotenvfile
const MONGO_URI = process.env.MONGO_URI

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(MONGO_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
const routes = require('./routes/todoRoutes')
app.use('/tasks', routes);

// Start the server
app.listen(3000, () => console.log(`Server running on port 3000`));


