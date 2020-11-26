import FormatError from "../formatError";
import Formatter from "../formatter";
import { parsePattern, parseQuote } from "../parsePattern";
import { standardOptions, standardFormats } from "./standardDateFormatStrings";
import { knownSeparators, defaultDateSeparator, defaultTimeSeparator } from "./dateSeparators";

export class DateFormatter extends Formatter<Date> {
    protected _cast(value: any): Date | never {
        if (!(value instanceof Date) && typeof value !== "bigint" && typeof value !== "symbol") {
            value = new Date(value);
        }
        if (!(value instanceof Date) || isNaN(value.getTime())) {
            throw new Error("Invalid date.");
        }
        return value;
    }

    protected _format(value: Date, format: string, culture: string): string | never {
        return (format ?? "").length <= 1 ? this._formatStandard(value, format, culture) : this._formatCustom(value, format, culture);
    }

    private _formatStandard(date: Date, format: string, culture: string) : string | never {
        if (standardOptions.has(format))
            return date.toLocaleString(culture, standardOptions.get(format));

        if (standardFormats.has(format))
            return this._formatCustom(date, standardFormats.get(format), culture);

        throw new FormatError();
    }

    private _formatCustom(date: Date, format: string, culture: string) : string | never {
        let result = "";

        for (let i = 0, tokenLength = 1; i < format.length; i += tokenLength) {
            let char = format[i];
            tokenLength = 1;
            switch (char) {

                case "d":
                    tokenLength = parsePattern(format, i);
                    switch (tokenLength) {
                        case 1:
                        case 2:
                            result += date.getDate().toString().padStart(tokenLength, "0");
                            break;
                        case 3:
                            result += date.toLocaleString(culture, { weekday: "short" });
                            break;
                        default:
                            result += date.toLocaleString(culture, { weekday: "long" });
                            break;
                    }
                    break;

                case "f":
                case "F":
                    tokenLength = parsePattern(format, i);
                    let f = Math.floor(date.getMilliseconds() * Math.pow(10, tokenLength - 3));
                    if (f || char !== "F") {
                        result += f.toString().padEnd(tokenLength, "0");
                    }
                    break;

                // NOTE:
                // We can't get the era alone, so we have to pull it out of the string with something else.
                // But this may not work in all cases.
                case "g":
                    tokenLength = parsePattern(format, i);
                    result += date.toLocaleString(culture, { era: "short", weekday: "short" }).split(" ").slice(0, -1).join(" ");
                    break;

                case "h":
                    tokenLength = parsePattern(format, i);
                    result += (date.getHours() % 12 || 12).toString().padStart(Math.min(tokenLength, 2), "0");
                    break;

                case "H":
                    tokenLength = parsePattern(format, i);
                    result += date.getHours().toString().padStart(Math.min(tokenLength, 2), "0");
                    break;

                case "K":
                case "z":
                    tokenLength = parsePattern(format, i);
                    let totalMinutes = date.getTimezoneOffset() * -1;
                    let hours = Math.abs(Math.floor(totalMinutes / 60));
                    let minutes = Math.abs(totalMinutes % 60);

                    if (char === "K" || tokenLength >= 3) {
                        result += `${(totalMinutes < 0 ? "-" : "+")}${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
                    } else {
                        result += `${(totalMinutes < 0 ? "-" : "+")}${hours.toString().padStart(tokenLength, "0")}`;
                    }
                    break;

                case "m":
                    tokenLength = parsePattern(format, i);
                    result += date.getMinutes().toString().padStart(Math.min(tokenLength, 2), "0");
                    break;

                case "M":
                    tokenLength = parsePattern(format, i);
                    switch (tokenLength) {
                        case 1:
                        case 2:
                            result += (date.getMonth() + 1).toString().padStart(tokenLength, "0");
                            break;
                        case 3:
                            result += date.toLocaleString(culture, { month: "short" });
                            break;
                        default:
                            result += date.toLocaleString(culture, { month: "long" });
                            break;
                    }
                    break;

                case "s":
                    tokenLength = parsePattern(format, i);
                    result += date.getSeconds().toString().padStart(Math.min(tokenLength, 2), "0");
                    break;

                // TODO:
                // The same story as about the era. But here everything is worse:
                // designator is often written together with a number, so it's
                // extremely problematic to develop a general rule for all cultures.
                //
                // This is kinda wrong, but it's the best solution for the moment.
                case "t":
                    tokenLength = parsePattern(format, i);
                    let designator = date.getHours() <= 12 ? "AM" : "PM";
                    result += tokenLength === 1 ? designator[0] : designator;
                    break;

                case "y":
                    tokenLength = parsePattern(format, i);
                    let year = date.getFullYear();
                    if (tokenLength < 3) {
                        year %= 100;
                    }
                    result += year.toString().padStart(tokenLength, "0");
                    break;

                case ":":
                    tokenLength = 1;
                    let timeContainer = date.toLocaleString(culture, { hour: "numeric", minute: "numeric" });
                    result += knownSeparators.find(separator => timeContainer.includes(separator)) ?? defaultTimeSeparator;
                    break;

                case "/":
                    tokenLength = 1;
                    let dateContainer = date.toLocaleString(culture, { day: "numeric", month: "numeric", year: "numeric" });
                    result += knownSeparators.find(separator => dateContainer.includes(separator)) || defaultDateSeparator;
                    break;

                case "%":
                    if (i === format.length - 1 || format[i + 1] === "%") {
                        throw new FormatError();
                    }
                    tokenLength = 2;
                    result += this._formatCustom(date, format[i + 1], culture);
                    break;

                case "\\":
                    if (i === format.length - 1) {
                        throw new FormatError();
                    }
                    tokenLength = 2;
                    result += format[i + 1];
                    break;

                case `'`:
                case `"`:
                    let quote: string;
                    [tokenLength, quote] = parseQuote(format, i);
                    result += quote;
                    break;

                default:
                    tokenLength = 1;
                    result += char;
                    break;
            }
        }

        return result;
    }
}

export default DateFormatter;