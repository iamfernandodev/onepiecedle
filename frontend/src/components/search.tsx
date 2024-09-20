import { Search as SearchI } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { CharacterProps } from '../types/character';

interface SearchProps {
    characters: CharacterProps[];
    winned: boolean;
    setCharacters: Dispatch<SetStateAction<CharacterProps[]>>;
}

export default function Search({ characters, winned, setCharacters }: SearchProps) {
    const [data, setData] = useState<Array<CharacterProps>>([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [focused, setFocused] = useState<string | null>(null);
    const [value, setValue] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        setSelectedIndex(-1);
    }

    const handleSelectCharacter = async (characterId: string) => {
        const character = data.find(ch => ch._id === characterId) as CharacterProps;
        character.correctKeys = [];

        setCharacters([character, ...characters]);
        setSelectedIndex(-1);
        setValue('');
        setData([]);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (data.length === 0)
            return;

        switch (event.key) {
            case 'ArrowDown':
                if (selectedIndex < data.length - 1) setFocused(data[selectedIndex + 1]._id);
                setSelectedIndex(prevIndex => (prevIndex < data.length - 1 ? prevIndex + 1 : prevIndex));
            break
            case 'ArrowUp':
                if (selectedIndex > 0) setFocused(data[selectedIndex - 1]._id);
                setSelectedIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
            break
            case 'Enter':
                if (selectedIndex < 0)
                    return;
                handleSelectCharacter(data[selectedIndex]._id);
            break
        }
    };

    useEffect(() => {
        const handleSearchCharacters = async(search: string) => {
            try {
                const response = await fetch(`http://localhost:3000/api/characters?search=${search}`);
    
                if (!response.ok)
                throw new Error('Erro ao buscar os dados');
    
                const data = await response.json();
    
                setData(
                    data.characters
                        .filter((character: CharacterProps) => !characters.map(ch => ch._id).includes(character._id))
                );
            } catch(error) {
                const err = error as Error;
    
                console.log('Ocorreu um erro ao buscar os dados.', err.message)
            }
        }

        if (value == '')
            return setData([]);

        handleSearchCharacters(value);
    }, [value, characters]);

    return (
        <div>
            <div className={`w-72 flex space-x-3 bg-zinc-100 text-zinc-800 p-2 rounded-md ${winned ? 'opacity-50 cursor-not-allowed' : ''} ${data.length > 0 ? 'rounded-bl-none rounded-br-none' : ''}`}>
                <SearchI className='text-zinc-800/50' />

                <input
                    ref={inputRef}
                    type="text"
                    placeholder='Digite um nome'
                    disabled={winned}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    value={value}
                    className={`bg-transparent placeholder:text-zinc-800/50 focus:outline-none w-full ${winned ? 'cursor-not-allowed' : ''}`}
                />
            </div>

            {data.length > 0 && (
                <ul className='absolute z-50 bg-zinc-100 w-72 rounded-b-md border-t overflow-hidden max-h-80 overflow-y-scroll'>
                    {data.map(character => (
                        <li
                            key={character._id}
                            id={character._id}
                            onClick={() => handleSelectCharacter(character._id)}
                            className={`flex items-center space-x-3 p-2 cursor-pointer select-none text-black ${character._id === focused ? 'bg-zinc-200' : ''}`}
                        >
                            <img src={character.image ?? 'luffy.jpg'} alt="Avatar" className='size-10' />
                            <p className='font-medium'>{character.name}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}