import { getRandomCharacter } from "../controllers/characterController";
import { Configuration } from "../types";
import { database } from "../database";

import sendLog from "../utils/sendLog";

export default async () => {
    setInterval(async () => {
        const configuration = database.get('configuration') as Partial<Configuration>;
        const oneDay = 1000 * 60 * 60 * 24;

        if (configuration.updatedTimestamp && Date.now() < configuration.updatedTimestamp)
            return;

        const randomCharacter = await getRandomCharacter({ configuration });

        sendLog({
            color: "cyan",
            message: `**${randomCharacter.name}** _was set as featured character_ ✨`
        });

        const featuredCharacter = configuration.featuredCharacter;
        const previousCharacters = configuration.previousCharacters;

        if (previousCharacters) {
            if (previousCharacters.length > 7)
                previousCharacters.pop();

            if (featuredCharacter)
                previousCharacters.unshift(featuredCharacter);
        }

        database.set('configuration', {
            featuredCharacter: randomCharacter,
            updatedTimestamp: Date.now() + oneDay,
            previousCharacters: previousCharacters ?? []
        } as any)
    }, 1000 * 5)
}