import DateFormatter from "../../format/date/dateFormatter";

declare global {
    interface Date {
        toString(format?: string, culture?: string): string;
    }
}

const dateFormatter = new DateFormatter();
const originalToString = Date.prototype.toString;

Date.prototype.toString = function(format?: string, culture?: string): string {
    return format ? dateFormatter.format(this, format, culture) : originalToString.apply(this);
}