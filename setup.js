const path = require('path');
const fs = require('fs');
const { MongoMemoryServer } = require('mongodb-memory-server');
const globalConfigPath = path.join(__dirname, 'globalConfig.json');

const mongod = new MongoMemoryServer({
  autoStart: false,
  instance: {
    dbName: 'ancronym-test'
  },
  binary: {
    version: '4.0.2',
    skipMD5: true
  }
});

module.exports = async () => {
  if (!mongod.isRunning) {
    await mongod.start();
  }

  const mongoConfig = {
    mongoDBName: 'ancronym-test',
    mongoUri: await mongod.getConnectionString(),
  };

  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));
  console.log('Config is written');

  global.__MONGOD__ = mongod;
}