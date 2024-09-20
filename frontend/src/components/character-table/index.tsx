import { Dispatch, SetStateAction } from "react";
import { CharacterProps } from "../../types/character";
import { CharactersBody } from "./body";
import { CharactersHeader } from "./header";

interface CharacterTableProps {
    characters: CharacterProps[];
    featuredCharacter: CharacterProps;
    setWinned: Dispatch<SetStateAction<boolean>>;
}

export default function CharacterTable({ characters, featuredCharacter, setWinned }: CharacterTableProps) {
    return (
        <div className="max-h-80 overflow-x-auto">
            <table>
                <CharactersHeader />
                
                <CharactersBody
                    characters={characters}
                    featuredCharacter={featuredCharacter}
                    setWinned={setWinned}
                />
            </table>
        </div>
    )
}