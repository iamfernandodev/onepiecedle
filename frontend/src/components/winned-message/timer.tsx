import { ConfigurationProps } from "../../types/character";
import { useEffect, useState } from "react";

interface TimerProps {
    configuration: ConfigurationProps;
    className: string;
}

export default function Timer({ configuration, className }: TimerProps) {
    const [timeRemaining, setTimeRemaining] = useState(configuration.updatedTimestamp - Date.now());

    useEffect(() => {
        const intervalId = setInterval(() => {
          setTimeRemaining(configuration.updatedTimestamp - Date.now());
        }, 1000);
    
        return () => clearInterval(intervalId);
    }, [configuration.updatedTimestamp]);

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    return (
        <span className={className}>
            {formatTime(timeRemaining)}
        </span>
    )
}