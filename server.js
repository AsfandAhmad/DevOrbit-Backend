require('dotenv').config();
const express = require('express');
const cors = require('cors');   // 👈 add this
const connectDB = require('./config/db');

const app = express();

// ✅ Allow CORS
app.use(
    cors({
        origin: [
            "http://localhost:3000",                  // local dev
            "https://dev-orbit-frontend.vercel.app"   // your Vercel frontend
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "x-auth-token"]
    })
);

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

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
