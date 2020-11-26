import FormatError from "./formatError";

export abstract class Formatter<T> {
    format(value : any, format?: string, culture?: string) : string | never {
        let castedValue = this._cast(value);

        if (!format) {
            return castedValue.toString();
        }

        if (typeof format !== "string") {
            throw new FormatError();
        }

        return this._format(castedValue, format, culture || "default");
    }

    protected abstract _cast(value : any) : T | never;

    protected abstract _format(value: T, format: string, culture: string) : string | never;
}

export default Formatter;