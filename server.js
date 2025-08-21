require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// ✅ Connect to MongoDB
if (!process.env.MONGO_URI) {
    console.error('❌ Error: MONGO_URI is not defined in environment variables');
    process.exit(1);
}
connectDB(process.env.MONGO_URI);

// ✅ CORS Middleware
const allowedOrigins = [
    "http://localhost:3000",                // local frontend
    "https://devorbit-frontend.vercel.app"  // Vercel frontend
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

// ✅ Body Parser Middleware
app.use(express.json({ extended: false }));

// ✅ API Routes
app.use('/api/users', require('./routes/API/users'));
app.use('/api/auth', require('./routes/API/auth'));
app.use('/api/profile', require('./routes/API/profile'));
app.use('/api/post', require('./routes/API/post'));

// ⚠️ IMPORTANT: Vercel serves frontend, Railway serves ONLY backend

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// ✅ Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`❌ Unhandled rejection: ${err.message}`);
    process.exit(1);
});

// ✅ Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error(`❌ Uncaught exception: ${err.message}`);
    process.exit(1);
});
