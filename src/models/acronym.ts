import mongoose, { Schema, Document, Model } from 'mongoose';

export interface AcronymAttributes {
  code: string;
  description: string;
}

export interface AcronymDocument extends Document {
  code: string;
  description: string;
}

interface AcronymModel extends Model<AcronymDocument> {
  build(acronym: AcronymAttributes): AcronymDocument;
}

const AcronymSchema: Schema = new Schema({
  code: { 
    type: String,
    required: true
  },
  description: { 
    type: String, 
    required: true
  }
}, { timestamps: true });

const Acronym = mongoose.model<AcronymDocument, AcronymModel>('Acronym', AcronymSchema);

AcronymSchema.statics.build = (acronym: AcronymAttributes) => {
  return new Acronym(acronym);
}

export default Acronym;
