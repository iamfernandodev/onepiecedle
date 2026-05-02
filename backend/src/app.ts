import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './database';
import runTasks from './tasks';

import characterRoutes from './routes/characterRoutes';
import configurationRoutes from './routes/configurationRoutes';

connectDB();
runTasks();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use('/api/characters', characterRoutes);
app.use('/api/configuration', configurationRoutes);


export default app;