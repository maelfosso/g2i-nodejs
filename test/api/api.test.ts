import mongoose from "mongoose";
import request from "supertest";
import faker from 'faker';
import app from "../../src/app";
import Acronym from '../../src/models/acronym';

declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_URI__: string;
      __MONGO_DB_NAME__: string;
    }
  }
}

const http = request(app);

describe("Tests concerning Acronym API", () => {

  beforeAll(async () => {
    try {
      await mongoose.connect(global.__MONGO_URI__, { useUnifiedTopology: true, useNewUrlParser: true })
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  describe('POST /acronym', () => {

    it ('should return 400 when the acronym code and description are empty', async () => {
      const invalid = {
        code: '',
        description: ''
      };

      const response = await http.post('/acronym')
        .send(invalid);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');     
      expect(response.body.errors).toHaveLength(2);
      expect(response.body.errors[0].field).toBe("code");
      expect(response.body.errors[1].field).toBe("description");
    });
    
    it ('should return 400 when the acronym code is empty', async () => {
      const invalid = {
        code: '',
        description: faker.lorem.paragraph()
      };

      const response = await http.post('/acronym')
        .send(invalid);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');     
      expect(response.body.errors[0].field).toBe("code");
    });

    it ('should return 400 when the acronym description is empty', async () => {
      const invalid = {
        code: faker.lorem.word(),
        description: ''
      };

      const response = await http.post('/acronym')
        .send(invalid);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');     
      expect(response.body.errors[0].field).toBe("description");
    });

  });

});
