import mongoose, {
  Document,
  Schema
} from 'mongoose';

export interface IAkumaNoMi {
  name: string;
  type: string;
}

export interface ICharacter extends Document {
  name: string;
  gender: 'Masculino' | 'Feminino';
  affiliation: string;
  akuma_no_mi: IAkumaNoMi | null;
  haki: string[];
  bounty: number;
  height: number;
  origin: string;
  first_appearance: string;
  image?: string;
}

export const AkumaNoMiSchema: Schema = new Schema({
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
});

export const ChracterSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Masculino", "Feminino"]
  },
  affiliation: {
    type: String,
    required: true
  },
  akuma_no_mi: {
    type: AkumaNoMiSchema,
    required: false
  },
  haki: {
    type: [String],
    required: true,
  },
  bounty: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  first_appearance: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

export default mongoose.model<ICharacter>('Character', ChracterSchema);