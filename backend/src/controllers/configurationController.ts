import { Request, Response } from 'express';
import { database } from '../database';

export const getConfiguration = async (req: Request, res: Response): Promise<void> => {
  try {
    const configuration = database.get('configuration');
    
    res.status(200).json({ message: 'Configuration successfully obtained.', data: configuration });
  } catch (err) {
    const error = err as Error;

    res.status(500).json({ message: error.message });
  }
}