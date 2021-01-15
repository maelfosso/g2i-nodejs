import express from 'express';
import mongoose from 'mongoose';
import debug from 'debug';
import { config } from './config/config';

const app = express();

app.use(express.json());

// app.listen(process.env.PORT || 3000, () => {
//   console.log('Listening on port 3000 !');
// });

mongoose
.connect(config.db.uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
.then(() => {
  debug(`Connected to MongoDB at ${config.db.uri}`);

  app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000 !');
  });
  
  // server.listen(port);
  // server.on('error', onError);
  // server.on('listening', onListening);

})
.catch((err) => {
  debug(`Failed to connect to MongoDB: ${err}`);
});



