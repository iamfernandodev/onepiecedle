import app from './app';
import sendLog from './utils/sendLog';

import path from 'path';
import fs from 'fs';

const dataPath = process.env.DATABASE_PATH || path.join(__dirname, './database');

if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath, { recursive: true });
}
if (!fs.existsSync(path.join(dataPath, 'collections'))) {
  fs.mkdirSync(path.join(dataPath, 'collections'), { recursive: true });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => sendLog({
    color: 'green',
    message: `Server running.`
}));