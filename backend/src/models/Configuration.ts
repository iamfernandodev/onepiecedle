import mongoose, { Schema } from 'mongoose';

import {
    ChracterSchema,
    ICharacter
} from './Character';

export interface IConfiguration {
    featuredCharacter: ICharacter;
    previousCharacters: ICharacter[];
    updatedTimestamp: number;
}

const ConfigurationSchema: Schema = new Schema({
    _id: {
        type: String,
        required: true
    },
    featuredCharacter: {
        type: ChracterSchema,
        default: null
    },
    previousCharacters: {
        type: [ChracterSchema],
        default: []
    },
    updatedTimestamp: {
        type: Number,
        default: 0
    }
});

export default mongoose.model<IConfiguration>('Configuration', ConfigurationSchema);