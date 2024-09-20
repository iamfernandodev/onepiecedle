import { ReactElement } from "react";
import { CharacterProps, Haki } from "../../types/character";
import { CharactersBodyItem } from "./body-item";
import { compareArrays } from "../../utils/compareArrays";

import arcs from "../../utils/arcs";

interface CharactersProps {
    characters: CharacterProps[];
    featuredCharacter: CharacterProps;
}

export function CharactersBody({ characters, featuredCharacter }: CharactersProps) {
    function formatBouty(value: number): ReactElement {
        const getFormat = (formattedValue: string) => {
            return (
                <>
                    <img src="beli.png" alt="Beli" className="size-3 select-none" />
                    {formattedValue}
                </>
            ) 
        }

        if (value >= 1_000_000_000) 
            return getFormat(`${(value / 1_000_000_000).toFixed(1).replace('.0', '')}bi`);
        
        if (value >= 1_000_000) 
            return getFormat(`${(value / 1_000_000).toFixed(1).replace('.0', '')}mi`);
        
        if (value >= 1_000) 
            return getFormat(`${(value / 1_000).toFixed(1).replace('.0', '')}k`);
        
        return getFormat(value.toString());
    }

    const hakiUtils = {
        Haoshoku: '👑',
        Busoshoku: '💪🏼',
        Kenbunshoku: '👀'
    }

    return (
        <tbody>
            {characters.map(character => {
                for (const [key, value] of Object.entries(character)) {
                    if (
                        !['gender', 'affiliation', 'akuma_no_mi', 'haki', 'bounty', 'height', 'origin']
                            .includes(key)
                    ) continue;

                    const typedKey = key as keyof CharacterProps;

                    if (
                        ['gender', 'affiliation', 'bounty', 'height', 'origin'].includes(key)
                        && featuredCharacter[typedKey] === value)
                        character.correctKeys.push(key);

                    if (
                        key === 'akuma_no_mi' &&
                        featuredCharacter.akuma_no_mi?.type === value?.type
                    ) character.correctKeys.push(key);

                    if (key === 'haki') {
                        const comparisonNumber = compareArrays(featuredCharacter.haki, value, true);

                        if (![1, 2].includes(comparisonNumber))
                            continue;

                        if (comparisonNumber === 1)
                            character.correctKeys.push(key);

                        if (comparisonNumber === 2)
                            character.correctKeys.push(`${key}_special`)
                    }
                }
                
                return (
                    <tr key={character._id} className="text-center">
                        <CharactersBodyItem
                            type="avatar"
                            character={character}
                            valueKey="image"
                        />

                        <CharactersBodyItem
                            character={character}
                            value={character.gender}
                            valueKey="gender"
                        />

                        <CharactersBodyItem 
                            character={character}
                            value={character.affiliation}
                            valueKey="affiliation"
                        />

                        <CharactersBodyItem 
                            character={character}
                            type="other"
                            value={character.akuma_no_mi?.type || 'Não tem'}
                            valueKey="akuma_no_mi"
                        />

                        <CharactersBodyItem
                            character={character}
                            type="other"
                            valueKey="haki"
                            className={character.haki.length > 0 ? 'text-base' : 'text-xs'}
                            value={
                                character.haki.length > 0
                                    ? character.haki
                                        .map((h: Haki) => hakiUtils[h])
                                        .join(' ')
                                    : 'Não tem'
                            }
                        />

                        <CharactersBodyItem
                            character={character}
                            className="flex items-center gap-1"
                            value={formatBouty(character.bounty)}
                            valueKey="bounty"
                            numberType={
                                character.correctKeys.includes('bounty') ? 'equal' :
                                featuredCharacter.bounty > character.bounty
                                    ? 'top' : 'bottom'
                            }
                        />

                        <CharactersBodyItem 
                            character={character}
                            value={`${character.height}cm`}
                            valueKey="height"
                            numberType={
                                character.correctKeys.includes('height') ? 'equal' :
                                featuredCharacter.height > character.height
                                    ? 'top' : 'bottom'
                            }
                        />

                        <CharactersBodyItem 
                            character={character}
                            value={character.origin}
                            valueKey="origin"
                            numberType={
                                arcs.indexOf(character.origin) === arcs.indexOf(featuredCharacter.origin)
                                    ? 'equal'
                                    : arcs.indexOf(featuredCharacter.origin) > arcs.indexOf(character.origin)
                                        ? 'top' : 'bottom'
                            }
                        />
                    </tr>
                )
            })}
        </tbody>
    )
}