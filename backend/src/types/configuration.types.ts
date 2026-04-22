import { Character } from "./character.types"

export interface Configuration {
    featuredCharacter: Character,
    previousCharacters: Character[],
    updatedTimestamp: number
}