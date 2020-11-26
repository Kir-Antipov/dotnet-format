import DateFormatter from "./format/date/dateFormatter";

type NotBigIntOrSymbol<T> = T extends BigInt | Symbol ? never : T;

const dateFormatter = new DateFormatter();

/**
 * Formats the date with the given format.
 *
 * @param date Date.
 * @param format Format string.
 *
 * @returns Formatted date.
 */
export function formatDate<T>(date: NotBigIntOrSymbol<T>, format?: string, culture?: string) : string | never {
    return dateFormatter.format(date, format, culture);
}