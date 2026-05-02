export interface AkumaNoMiProps {
    name: string;
    type: string;
}

export type Haki = 'Haoshoku' | 'Busoshoku' | 'Kenbunshoku';
  
export interface CharacterProps {
    _id: string,
    name: string;
    gender: 'Masculino' | 'Feminino';
    affiliation: string;
    akuma_no_mi: AkumaNoMiProps | null;
    haki: Haki[];
    bounty: number;
    height: number;
    origin: string;
    first_appearance: string;
    image?: string;
    correctKeys: string[];
}
  
interface ConfigurationProps {
    featuredCharacter: CharacterProps;
    previousCharacters: CharacterProps[];
    updatedTimestamp: number;
}