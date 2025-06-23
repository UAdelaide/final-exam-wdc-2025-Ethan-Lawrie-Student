const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');

const app = express();


app.use(session({
    secret: "test",
    resave: false,
    saveUninitialized: false
}))
// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');
const userRoutes = require('./routes/loginRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

app.use('/api/login', loginRoutes);

// Export the app instead of listening here
module.exports = app;