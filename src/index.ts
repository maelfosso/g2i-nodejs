import express from 'express';
import mongoose from 'mongoose';
import debugLib from 'debug';
import { config } from './config/config';
import apiRoutes from './routes/api.routes';

const debug = debugLib('g2i:api');

const app = express();

app.use(express.json());

app.use('/api', apiRoutes);

mongoose
.connect(config.db.uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => {
  debug(`Connected to MongoDB at ${config.db.uri}`);

  app.listen(process.env.PORT || 3000, () => {
    debug('Listening on port 3000 !');
  });

})
.catch((err) => {
  debug(`Failed to connect to MongoDB: ${err}`);
});



