import chalk from 'chalk';

interface LogProps {
    color: keyof ChalkColors;
    message: string;
}

interface ChalkColors {
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    gray: string;
    grey: string;
    redBright: string;
    greenBright: string;
    yellowBright: string;
    blueBright: string;
    magentaBright: string;
    cyanBright: string;
    whiteBright: string;
}

/**
 * - `**texto**`: Negrito
 * - `_texto_`: Itálico
 * - `__texto__`: Sublinhado
 * - `~texto~`: Tachado (strikethrough)
 * - `!!texto!!`: Inversão de cores (inverse)
 * - `*texto*`: Texto com opacidade (dim)
 */

const applyStyles = (message: string): string => {
    return message.replace(
        /(\*\*(.*?)\*\*)|(_(.*?)_)|(__(.*?)__)|(~(.*?)~)|(\!\!(.*?)\!\!)|(\*(.*?)\*)/g,
        (match, bold, boldText, italic, italicText, underline, underlineText, strikethrough, strikethroughText, inverse, inverseText, dim, dimText) => {
        if (bold) return chalk.bold(boldText);
        if (italic) return chalk.italic(italicText);
        if (underline) return chalk.underline(underlineText);
        if (strikethrough) return chalk.strikethrough(strikethroughText);
        if (inverse) return chalk.inverse(inverseText);
        if (dim) return chalk.dim(dimText);

        return match;
    });
};

export default ({ color, message }: LogProps) => {
    const styledMessage = applyStyles(message);
    const actionDate = new Date();

    console.log(chalk[color].dim(`[${actionDate.toLocaleString()}] `) + chalk[color](styledMessage));
};
