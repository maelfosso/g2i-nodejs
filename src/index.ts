import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import debugLib from 'debug';
import 'express-async-errors';

import { config } from './config/config';
import seed from './utils/seed';

import apiRoutes from './routes/api.routes';
import { errorHandler } from './middlewares/error-handler';

const debug = debugLib('g2i:api');

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


// MongoDB connection and start the server
mongoose
.connect(config.db.uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => {
  debug(`Connected to MongoDB at ${config.db.uri}`);

  seed();

  app.listen(process.env.PORT || 3000, () => {
    debug('Listening on port 3000 !');
  });

})
.catch((err) => {
  debug(`Failed to connect to MongoDB: ${err}`);
});



