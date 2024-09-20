interface HelpItemProps {
    text: string;
    type: 'DANGER' | 'CORRECT' | 'OTHER';
    orientation?: 'top' | 'bottom';
}

export function HelpItem({ text, type, orientation }: HelpItemProps) {
    const colorUtils = {
        DANGER: {
            bgColor: 'bg-[#f87171]',
            borderColor: 'border-[#fca5a5]'
        },
        CORRECT: {
            bgColor: 'bg-[#10b981]',
            borderColor: 'border-[#34d399]'
        },
        OTHER: {
            bgColor: 'bg-[#fbd86a]',
            borderColor: 'border-[#f9e8a7]'
        },
    }

    const orientationImages = {
        top: 'https://cdn-icons-png.flaticon.com/512/4906/4906864.png',
        bottom: 'https://cdn-icons-png.flaticon.com/512/626/626013.png'
    }

    return (
        <div className="flex items-center space-x-5">
            <div className={`size-10 border-2 ${colorUtils[type].bgColor} ${colorUtils[type].borderColor}`}>
                {orientation && (
                    <img
                        className="select-none opacity-10"
                        src={orientationImages[orientation]}
                        alt={orientation === 'top' ? '⬆️' : '⬇️'}
                    />
                )}
            </div>
            <span>{text}</span>
        </div>
    )
}