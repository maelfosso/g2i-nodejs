import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import debugLib from 'debug';
import 'express-async-errors';


import apiRoutes from './routes/api.routes';
import { errorHandler } from './middlewares/error-handler';


const app = express();

// Initialize routes
app.use(express.json());
app.use(cors());

// Routes
app.use('/', apiRoutes);

// Route Not found
app.all('*', async () => {
  throw new Error("Route not found!")
});

// Handle errors
app.use(errorHandler);

// Enable mongoose debug
mongoose.set('debug', true);

export default app;