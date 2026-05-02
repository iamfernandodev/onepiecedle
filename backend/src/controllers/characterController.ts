import { Request, Response } from 'express';
import Character, { ICharacter } from '../models/Character';
import { IConfiguration } from '../models/Configuration';

interface GetRandomCharacterProps {
  configuration: IConfiguration
}

export const createCharacter = async (req: Request, res: Response): Promise<void> => {
  try {
    const character: ICharacter = new Character(req.body);
    await character.save();

    res.status(201).json({ message: 'Character created', character });
  } catch (err) {
    const error = err as Error;

    res.status(500).json({ message: error.message });
  }
}

export const findCharacters = async (req: Request, res: Response): Promise<void> => {
  try {
    const value = req.query.search;

    if (!value) {
      res.status(400).json({ message: 'Invalid or missing \'search\' argument.' });
      return;
    }

    const characters = await Character.find({ name: { $regex: value, $options: 'i' } });

    res.status(200).json({ message: 'Successfully find characters.', characters });
  } catch (err) {
    const error = err as Error;

    res.status(500).json({ message: error.message });
  }
}

export const getRandomCharacter = async ({ configuration }: GetRandomCharacterProps) => {
  const previousIds = configuration.previousCharacters.map(c => c._id);

  const count = await Character.countDocuments({ _id: { $nin: previousIds } });
  const random = ~~(Math.random() * count);

  const character = await Character.findOne({ _id: { $nin: previousIds } }).skip(random) as ICharacter;

  return character;
}