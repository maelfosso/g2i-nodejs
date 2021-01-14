import { MongoClient, Db } from 'mongodb';
import Acronym from '../../src/models/acronym';

declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: string;
      __MONGO_DB_NAME__: string;
    }
  }
}

describe('insert', () => {
  let connection: MongoClient;
  let db: Db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true
    });
    db = connection.db(global.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });

  it ('should not insert an acronym with name empty', async () => {
    const invalid = new Acr
  });

  it ('should not insert an acronym with empty description', async () => {

  });

  it ('should not insert an acronym with already used name', async () => {

  });

  it ('should insert an acronym with name and description filled', async () => {

  });

});