import { CharactersHeaderItem } from "./header-item";

export function CharactersHeader() {
    return (
        <thead>
            <tr className="text-[9px] break-words">
                <CharactersHeaderItem name="personagem" />
                <CharactersHeaderItem name="gênero" />
                <CharactersHeaderItem name="afiliação" />
                <CharactersHeaderItem name="akuma no mi" />
                <CharactersHeaderItem name="haki" />
                <CharactersHeaderItem name="recompensa" />
                <CharactersHeaderItem name="tamanho" />
                <CharactersHeaderItem name="aparição" />
            </tr>
        </thead>
    )
}