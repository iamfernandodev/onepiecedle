import { CharacterProps, ConfigurationProps } from "../../types/character";
import { motion, MotionConfig } from "framer-motion";
import { Share2 } from "lucide-react";

import Timer from "./timer";

interface WinnedMessageProps {
    characters: CharacterProps[];
    configuration: ConfigurationProps;
}

export default function WinnedMessage({ characters, configuration }: WinnedMessageProps) {
    return (
            <MotionConfig transition={{ duration: 1, delay: 3.5 }}>
                <motion.div
                    className='h-screen w-screen flex justify-center items-center fixed z-50 bg-black/30 text-sm'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 100 }}
                >
                    <div className='rounded-xl overflow-hidden w-64 flex flex-col items-center shadow-2xl text-sm'>
                        <div className='bg-gray-200 w-full flex justify-between items-center px-2'>
                            <img src="tada.gif" alt="🎉" className='size-4 select-none' />

                            <div className='w-full flex justify-center'>
                            <span className='font-bold'>Parabéns!</span>
                            </div>

                            <img src="tada.gif" alt="🎉" className='size-4 select-none -scale-x-100' />
                        </div>



                        <div className='bg-slate-100 w-full flex flex-col items-center gap-5 p-2'>
                            <div className="flex items-center space-x-5">
                                <img
                                    src={configuration.featuredCharacter.image}
                                    alt={configuration.featuredCharacter.name}
                                    className="size-20 rounded"
                                />

                                <div className="flex flex-col space-y-2">
                                    <span className="font-medium text-lg">{configuration.featuredCharacter.name}</span>
                                    <span className="text-xs text-black/50">{configuration.featuredCharacter.affiliation}</span>
                                </div>
                            </div>

                            <span>🏆 Você acertou em <span className="font-bold">{characters.length}</span> tentativas.</span>

                            <div
                                className="h-0.5 w-48 bg-gray-300/50"
                                style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }}
                            />

                            <div className="flex flex-col items-center">
                                <span className="text-xs">Próximo personagem em</span>
                                <Timer
                                    configuration={configuration}
                                    className="text-xl font-bold"
                                />
                            </div>

                            <button className='bg-[#5663EC] text-white px-2 py-1 rounded flex items-center gap-2 text-xs cursor-not-allowed'>
                                <Share2 className='size-3' /> Compartilhar
                            </button>
                        </div>
                    </div>
                </motion.div>
            </MotionConfig>
    )
}