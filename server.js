import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB, getDbStatus } from './config/db.js';
import transactionRoutes from './routes/transactionRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'Expense Tracker API is running smoothly',
    isDatabaseConnected: getDbStatus(),
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/transactions', transactionRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('Expense Tracker Backend API is active. Go to /api/transactions to view data.');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`\n🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
  console.log(`📡 API endpoint ready at: http://localhost:${PORT}/api/transactions\n`);
});
