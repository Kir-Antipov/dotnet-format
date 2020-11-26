import DateFormatter from "../../format/date/dateFormatter";

declare global {
    interface Date {
        format(format?: string, culture?: string): string;
    }
}

const dateFormatter = new DateFormatter();

Date.prototype.format = function(format?: string, culture?: string): string {
    return format ? dateFormatter.format(this, format, culture) : this.toString();
}