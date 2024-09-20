import { CharacterProps, ConfigurationProps } from './types/character';
import { Loader, BookOpen, Apple } from 'lucide-react';
import { compareArrays } from './utils/compareArrays';
import { useEffect, useState } from 'react';
import { HelpCircle } from 'lucide-react';

import CharacterTable from './components/character-table';
import WinnedMessage from './components/winned-message';
import HelpMessage from './components/help-message';
import Search from './components/search';
import Tip from './components/tip-button';

export default function App() {
  const [configuration, setConfiguration] = useState<ConfigurationProps | null>(null);
  const [characters, setCharacters] = useState<Array<CharacterProps>>([]);
  const [tips, setTips] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(true);
  const [winned, setWinned] = useState(false);
  const [help, setHelp] = useState(false);

  const getConfiguration = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/configuration`);

      if (!response.ok)
        throw new Error('Erro ao buscar os dados');

      const responseJson = await response.json();
      const data = responseJson.data;

      setConfiguration(data);
      setLoading(false);
    } catch(error) {
        const err = error as Error;

        console.log('Ocorreu um erro ao buscar os dados.', err.message)
    }
  }

  useEffect(() => {
    getConfiguration();
  }, []);

  useEffect(() => {
    const character = characters[0];

    if (!character)
      return;

    if (compareArrays(
        character.correctKeys,
        ['gender', 'affiliation', 'akuma_no_mi', 'haki', 'bounty', 'height', 'origin']
    ) === 1) setWinned(true);
    
}, [characters, setWinned]);

  return (
    <>
      {loading && (
        <div className='h-screen flex justify-center items-center'>
          <Loader className='animate-spin text-black'/>
        </div>
      )}

      {!loading && (
        <>
          {winned && (
            <WinnedMessage
              characters={characters}
              configuration={configuration!}
            />
          )}

          {help && (
            <HelpMessage setHelp={setHelp} />
          )}

          <div className="h-screen flex flex-col items-center space-y-6">
              <button className='fixed right-0 top-0 p-5'>
                <HelpCircle
                  className='hover:text-black/50'
                  onClick={() => setHelp(true)}
                />
              </button>

            <div className='w-72 space-y-6 flex flex-col items-center'>
              <div className='flex flex-col items-center'>
                <h1 className='font-medium'>Adivinhe o personagem de</h1>

                <img src="https://upload.wikimedia.org/wikipedia/pt/7/75/One_Piece_Logo.png" alt="One Piece" className='w-32' />
              </div>

              <div className='flex text-xs space-x-5'>
                <Tip
                  text="PISTA DE PRIMEIRA APARIÇÃO"
                  icon={BookOpen}
                  disabled={characters.length < 5}
                  content={`Apareceu no ${configuration!.featuredCharacter.first_appearance} em ${configuration!.featuredCharacter.origin}`}
                  tips={tips}
                  setTips={setTips}
                />

                <Tip
                  text="PISTA DE AKUMA NO MI"
                  icon={Apple}
                  disabled={characters.length < 8}
                  content={
                    configuration!.featuredCharacter.akuma_no_mi
                      ? `Possui a ${configuration!.featuredCharacter.akuma_no_mi.name} (${configuration!.featuredCharacter.akuma_no_mi.type})`
                      : 'Não tem akuma no mi'
                  }
                  tips={tips}
                  setTips={setTips}
                />
              </div>
            </div>

            <div className='h-full flex flex-col items-center justify-around'>
              <Search
                characters={characters}
                winned={winned}
                setCharacters={setCharacters}
              />

              {tips.length > 0 && (
                <div className='flex flex-col text-xs text-center font-medium space-y-2'>
                  {tips.map(tip => (
                    <span>📌 {tip}</span>
                  ))}
                </div>
              )}

              {characters.length > 0 && (
                <CharacterTable
                  characters={characters}
                  featuredCharacter={configuration!.featuredCharacter}
                  setWinned={setWinned}
                />
              )}

              <p className='text-sm'>O personagem de ontem foi <span className='font-bold'>{configuration!.previousCharacters[0].name}</span></p>
            </div>
          </div>
        </>
      )}
    </>
  )
}