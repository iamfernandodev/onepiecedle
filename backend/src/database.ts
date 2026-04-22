import { Database } from 'simpl.db';
import { Character } from './types';

import path from 'path';

const dataPath = process.env.DATABASE_PATH || path.join(__dirname, './database');

const database = new Database({
    dataFile: path.join(__dirname, './database/database.json'),
    collectionsFolder: path.join(__dirname, './database/collections'),
    tabSize: 3
});

const Characters = database.createCollection<Character>('characters');

export {
    database,
    Characters
}