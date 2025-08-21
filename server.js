require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in environment variables');
    process.exit(1);
}
connectDB(process.env.MONGO_URI);

// Middleware
app.use(express.json({ extended: false }));

// API Routes
app.use('/api/users', require('./routes/API/users'));
app.use('/api/auth', require('./routes/API/auth'));
app.use('/api/profile', require('./routes/API/profile'));
app.use('/api/post', require('./routes/API/post'));

// ⚠️ IMPORTANT: Do NOT serve React from backend.
// Vercel is serving your frontend, Railway only serves API.

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled rejection: ${err.message}`);
    process.exit(1);
});

///
// Handle uncaught exceptions