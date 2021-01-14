import mongoose, { Schema, Document } from 'mongoose';

export interface AcronymDocument extends Document {
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
}, { timestamps: true });

export default mongoose.model<AcronymDocument>('Acronym', AcronymSchema);
