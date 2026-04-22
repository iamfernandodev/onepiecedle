import { Request, Response } from 'express';
import { Character, Configuration } from '../types';
import { Characters } from '../database';

interface GetRandomCharacterProps {
  configuration: Partial<Configuration>
}

/* export const createCharacter = async (req: Request, res: Response): Promise<void> => {
  try {
    const character: Character = new Character(req.body);
    await character.save();
    
    res.status(201).json({ message: 'Character created', character });
  } catch (err) {
    const error = err as Error;

    res.status(500).json({ message: error.message });
  }
} */

export const findCharacters = async (req: Request, res: Response): Promise<void> => {
  try {
    const value = req.query.search as string;

    if (!value) {
      res.status(400).json({ message: 'Invalid or missing \'search\' argument.' });
      return;
    }

    const characters = Characters.fetchMany(c => c.name.toLocaleLowerCase().includes(value.toLowerCase()));

    res.status(200).json({ message: 'Successfully find characters.', characters });
  } catch (err) {
    const error = err as Error;

    res.status(500).json({ message: error.message });
  }
}

export const getRandomCharacter = async ({ configuration }: GetRandomCharacterProps) => {
  const allCharacters = Characters.getAll() as Character[];

  const previousCharacters = configuration.previousCharacters ?? [];

  const availableCharacters = allCharacters.filter(
    (c: Character) => !previousCharacters.includes(c)
  );

  return availableCharacters[
    Math.floor(Math.random() * availableCharacters.length)
  ];
}