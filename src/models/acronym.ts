import mongoose, { Schema, Document } from 'mongoose';

export interface IAcronym extends Document {
  name: string;
  description: string;
}

const AcronymSchema: Schema = new Schema({
  name: { 
    type: String,
    required: true
  },
  description: { 
    type: String, 
    required: true
  }
});

export default mongoose.model<IAcronym>('Acronym', AcronymSchema);
