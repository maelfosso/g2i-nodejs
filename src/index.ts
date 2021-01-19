import mongoose from 'mongoose';
import debugLib from 'debug';

import { config } from './config/config';
import seed from './utils/seed';
import app from './app';


const debug = debugLib('g2i:api');

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
