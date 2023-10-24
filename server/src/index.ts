import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';

const cors = require('cors');

const app = express();

dotenv.config();
app.use(bodyParser.json());

// Use CORS middleware to allow requests from Angular's development server
app.use(cors({ origin: "http://localhost:4200" }));

// Handle OPTIONS requests (for preflight checks)
app.options('*', cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/accounting');

// Routes will be added here
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
