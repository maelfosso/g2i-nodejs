import mongoose from 'mongoose';
import faker from 'faker';
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
  
  beforeAll(async () => {
    try {
      await mongoose.connect(global.__MONGO_URI__, { useUnifiedTopology: true })
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it ('should not insert an acronym with name empty', async () => {
    const invalid = new Acronym({
      name: '',
      description: faker.lorem.paragraph()
    });
    const error = invalid.validateSync();

    expect(error).toBeDefined();
    expect(error?.name).toEqual('ValidationError');
    expect(error?.message).toContain('name');
    expect(error?.message).toContain('required');
  });

  it ('should not insert an acronym with empty description', async () => {
    const invalid = new Acronym({
      name: faker.lorem.word(),
      description: ''
    });
    const error = invalid.validateSync();

    expect(error).toBeDefined();
    expect(error?.name).toEqual('ValidationError');
    expect(error?.message).toContain('description');
    expect(error?.message).toContain('required');
  });

  it ('should not insert an acronym with already used name', async () => {
    const invalid = new Acronym({
      name: '',
      description: ''
    });
    const error = invalid.validateSync();

    expect(error).toBeDefined();
    expect(error?.name).toEqual('ValidationError');
  });

  it ('should insert an acronym with name and description filled', async () => {
    const valid = new Acronym({
      name: faker.lorem.word(),
      description: faker.lorem.paragraph()
    });
    const error = valid.validateSync();

    expect(error).not.toBeDefined();
    
    const saved = await valid.save();
    expect(saved).toBeDefined();
    expect(saved._id).toBeDefined();
    expect(saved.name).toBe(valid.name);
    expect(saved.description).toBe(valid.description);
  });

});