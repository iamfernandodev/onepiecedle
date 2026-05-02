import { Request, Response } from 'express';
import Configuration from '../models/Configuration';

export const getConfiguration = async (req: Request, res: Response): Promise<void> => {
  try {
    const configuration = await Configuration.findById('onepiecedle');

    res.status(200).json({ message: 'Configuration successfully obtained.', data: configuration });
  } catch (err) {
    const error = err as Error;

    res.status(500).json({ message: error.message });
  }
}