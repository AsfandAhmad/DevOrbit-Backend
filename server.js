require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Log Mongo URI to verify it's loaded properly
console.log('Mongo URI:', process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in your environment variables');
    process.exit(1); // Stop the server if no DB connection string
}

// Connect to the database
connectDB(process.env.MONGO_URI);

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.use('/api/users', require('./routes/API/users'));
app.use('/api/auth', require('./routes/API/auth'));
app.use('/api/profile', require('./routes/API/profile'));
app.use('/api/post', require('./routes/API/post'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle unhandled promise rejections (optional but recommended)
process.on('unhandledRejection', (err, promise) => {
    console.error(`Unhandled rejection: ${err.message}`);
    // Close server & exit process if needed
    process.exit(1);
});
