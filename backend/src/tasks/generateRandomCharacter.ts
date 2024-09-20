import { config } from "dotenv";
import { getRandomCharacter } from "../controllers/characterController";
import Configuration, { IConfiguration } from "../models/Configuration";
import sendLog from "../utils/sendLog";

export default async () => {
    setInterval(async () => {
        const configuration = await Configuration.findById('onepiecedle') as IConfiguration;
        const oneDay = 1000 * 60 * 60 * 24;

        if (Date.now() < configuration.updatedTimestamp)
            return;

        const randomCharacter = await getRandomCharacter({ configuration });

        sendLog({
            color: "cyan",
            message: `**${randomCharacter.name}** _was set as featured character_ ✨`
        });
        
        const featuredCharacter = configuration.featuredCharacter;
        const previousCharacters = configuration.previousCharacters;

        if (previousCharacters.length > 7)
            previousCharacters.pop();

        if (featuredCharacter) previousCharacters.unshift(featuredCharacter);

        await Configuration.findByIdAndUpdate('onepiecedle', {
            $set: {
                featuredCharacter: randomCharacter,
                updatedTimestamp: Date.now() + oneDay,
                previousCharacters
            }
        });
    }, 1000 * 60)
}