export interface Character {
    _id: string
    name: string,
    gender: string,
    affiliation: string,
    akuma_no_mi?: AkumaNoMiSchema,
    haki: string[],
    bounty: number,
    height: number,
    origin: string,
    first_appearance: string,
    image: string
}

interface AkumaNoMiSchema {
    name: string,
    type: string
}