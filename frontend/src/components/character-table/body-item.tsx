import { twMerge } from "tailwind-merge";
import { CharacterProps } from "../../types/character";
import { ReactElement } from "react";
import { motion, MotionConfig } from "framer-motion";

interface CharactersBodyItemProps {
    type?: 'avatar' | 'key' | 'other';
    numberType?: 'top' | 'bottom' | 'equal';
    className?: string;
    character: CharacterProps;
    valueKey: string;
    value?: string | ReactElement;
}

interface AnimationDurationProps {
    gender: number;
    affiliation: number;
    akuma_no_mi: number;
    haki: number;
    bounty: number;
    height: number;
    origin: number;
    [key: string]: number;
}

interface ColorUtils {
    [key: number]: {
      bgColor: string;
      borderColor: string;
    };
}

export function CharactersBodyItem({
    type = 'key',
    numberType,
    className,
    character,
    valueKey,
    value,
}: CharactersBodyItemProps) {
    const colorUtils: ColorUtils = {
        0: {
            bgColor: '#f87171',
            borderColor: '#fca5a5'
        },
        1: {
            bgColor: '#10b981',
            borderColor: '#34d399'
        },
        2: {
            bgColor: '#fbd86a',
            borderColor: '#f9e8a7'
        }
    }

    let colorNumber = +character.correctKeys.includes(valueKey);

    if (character.correctKeys.includes(`${valueKey}_special`))
        colorNumber = 2;
        
    const animationDuration: AnimationDurationProps = {
        gender: 0.5,
        affiliation: 1,
        akuma_no_mi: 1.5,
        haki: 2,
        bounty: 2.5,
        height: 3,
        origin: 3.5,
    };

    const typeImages = {
        top: 'https://cdn-icons-png.flaticon.com/512/4906/4906864.png',
        bottom: 'https://cdn-icons-png.flaticon.com/512/626/626013.png'
    }

    return (
        <td>
            {type === 'avatar' ? (
                <img
                    className="w-16 h-16 mx-auto rounded-md select-none"
                    src={character.image}
                    alt={`Imagem de ${character.name}`}
                />
            ) : (
                <MotionConfig transition={{ duration: 1, delay: animationDuration[valueKey] }}>
                    <motion.div 
                        className={`flex justify-center items-center rounded-md border-2 w-16 h-16 text-white`}
                        initial={{ rotateX: 0, backgroundColor: '#c3c3c3cc', borderColor: '#d3d3d3' }}
                        animate={{
                            rotateX: 180,
                            backgroundColor: colorUtils[colorNumber].bgColor,
                            borderColor: colorUtils[colorNumber].borderColor
                        }}
                    >
                        {numberType && numberType != 'equal' && (
                            <motion.div
                                className="absolute size-12"
                                initial={{ rotateX: 0, opacity: 0 }}
                                animate={{ rotateX: 180, opacity: 0.10 }}
                            >
                                <img
                                    className="select-none"
                                    src={typeImages[numberType]}
                                    alt={numberType === 'top' ? '⬆️' : '⬇️'}
                                />
                            </motion.div>
                        )}

                        <motion.span
                            className={twMerge('break-all text-xs', className)}
                            initial={{ rotateX: 0 }}
                            animate={{ rotateX: 180 }}
                        >
                            {value}
                        </motion.span>
                    </motion.div>
                </MotionConfig>
            )}
        </td>
    )
}