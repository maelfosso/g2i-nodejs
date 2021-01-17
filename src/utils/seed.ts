import data from './data.json';
import mongoose from 'mongoose';
import debugLib from 'debug';
import Acronym, { AcronymDocument } from '../models/acronym';

const debug = debugLib('g2i:seed');

// Clean the collection
Acronym.remove({});
debug('Acronym collection cleaned up')

const seed = async () => {

  // Add data into the collection
  for (let i=0; i < data.length; i++) {
    const datum = data[i];
    const [code, description] = Object.entries(datum)[0] as [string, string];
  
    const a = Acronym.build({
      code: code, 
      description: description
    });
    await a.save();
  }

  debug('Acronym collection seed !');

}

export default seed;