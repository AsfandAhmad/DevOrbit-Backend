require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

// Connect DB
if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI missing');
    process.exit(1);
}
connectDB(process.env.MONGO_URI);

// CORS (allow your Vercel app + local dev)
const allowedOrigins = [
    'http://localhost:3000',
    'https://devorbit-frontend.vercel.app', // <-- your Vercel domain (adjust if different)
];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Body parser
app.use(express.json());

// Health check (for quick testing)
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

// API routes
app.use('/api/users', require('./routes/API/users'));
app.use('/api/auth', require('./routes/API/auth'));
app.use('/api/profile', require('./routes/API/profile'));
app.use('/api/post', require('./routes/API/post')); // <-- see Step 4 about "post" vs "posts"

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Safety
process.on('unhandledRejection', (err) => { console.error(err); process.exit(1); });
process.on('uncaughtException', (err) => { console.error(err); process.exit(1); });
