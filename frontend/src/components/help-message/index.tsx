import { motion, MotionConfig } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { X } from 'lucide-react';
import { HelpItem } from "./item";

interface HelpMessageProps {
    setHelp: Dispatch<SetStateAction<boolean>>;
}

export default function HelpMessage({ setHelp }: HelpMessageProps) {
    return (
        <div className="h-screen w-screen flex justify-center z-50 items-center fixed bg-black/30">
            <MotionConfig transition={{ duration: 0.5 }}>
                <motion.div
                    className='rounded-xl overflow-hidden w-64 flex flex-col shadow-2xl bg-slate-100'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 100 }}
                >
                    <div className='bg-gray-200 w-full flex justify-between items-center px-2'>
                        <div className="flex w-full justify-center">
                            <span className='font-medium'>Indicadores de Cor</span>
                        </div>

                        <button onClick={() => setHelp(false)}>
                            <X className="size-3" />
                        </button>
                    </div>

                    <div className="p-5 space-y-2 text-sm">
                        <HelpItem
                            text="Incorreto"
                            type="DANGER"
                        />
                        
                        <HelpItem
                            text="Correto"
                            type="CORRECT"
                        />

                        <HelpItem
                            text="Imparcial"
                            type="OTHER"
                        />

                        <HelpItem
                            text="Mais alto"
                            type="DANGER"
                            orientation="top"
                        />

                        <HelpItem
                            text="Mais baixo"
                            type="DANGER"
                            orientation="bottom"
                        />
                    </div>
                </motion.div>
            </MotionConfig>
        </div>
    )
}