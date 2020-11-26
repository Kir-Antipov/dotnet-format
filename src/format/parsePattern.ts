import FormatError from "./formatError";

export function parsePattern(format: string, pos: number) : number {
    let pattern = format[pos];
    let i = pos + 1;
    while ((i < format.length) && (format[i] === pattern)) {
        ++i;
    }
    return (i - pos);
}

export function parseQuote(format: string, pos: number) : [number, string] {
    let i = pos;
    let quote = format[i++];
    let result = "";

    while (i < format.length) {
        let char = format[i++];
        if (char === quote) {
            break;
        }
        else if (char === "\\") {
            if (i === format.length - 1) {
                throw new FormatError();
            }
            result += format[i++];
        } else {
            result += char;
        }
    }

    if (format[i - 1] !== quote) {
        throw new FormatError();
    }

    return [i - pos, result];
}