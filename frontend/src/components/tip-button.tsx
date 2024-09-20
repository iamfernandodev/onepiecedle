import { LucideProps } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

interface TipProps {
    text: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    disabled: boolean;
    content: string;
    tips: string[];
    setTips: Dispatch<SetStateAction<string[]>>;
}

export default function TipButton({ text, icon, disabled, content, tips, setTips }: TipProps) {
    const [forceDisabled, setForceDisabled] = useState(false);
    const Icon = icon;

    return (
        <button
            onClick={() => {
                setForceDisabled(true);
                setTips([...tips, content]);
            }}
            disabled={forceDisabled || disabled}
            className='border-2 border-black disabled:border-black/20 text-black disabled:text-black/20 w-20 flex flex-col items-center text-center text-xs space-y-2 p-2 rounded-xl'
        >
            <Icon className='size-4' />

            <span className='font-medium'>{text}</span>
        </button>
    )
}