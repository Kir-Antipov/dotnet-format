export const standardOptions = new Map<string, Intl.DateTimeFormatOptions>([
    ["d", { day: "2-digit", month: "2-digit", year: "numeric" }],
    ["D", { day: "2-digit", month: "long", year: "numeric", weekday: "long" }],
    ["f", { day: "2-digit", month: "long", year: "numeric", weekday: "long", hour: "2-digit", minute: "2-digit" }],
    ["F", { day: "2-digit", month: "long", year: "numeric", weekday: "long", hour: "2-digit", minute: "2-digit", second: "2-digit" }],
    ["g", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }],
    ["G", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" }],
    ["m", { day: "numeric", month: "long" }],
    ["M", { day: "numeric", month: "long" }],
    ["t", { hour: "2-digit", minute: "2-digit" }],
    ["T", { hour: "2-digit", minute: "2-digit", second: "2-digit" }],
    ["U", { day: "2-digit", month: "long", year: "numeric", weekday: "long", hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "UTC" }],
    ["y", { year: "numeric", month: "long" }],
    ["Y", { year: "numeric", month: "long" }]
]);

export const standardFormats = new Map<string, string>([
    ["o", "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffffffzzz"],
    ["O", "yyyy'-'MM'-'dd'T'HH':'mm':'ss'.'fffffffzzz"],
    ["r", "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'"],
    ["R", "ddd, dd MMM yyyy HH':'mm':'ss 'GMT'"],
    ["s", "yyyy'-'MM'-'dd'T'HH':'mm':'ss"],
    ["u", "yyyy'-'MM'-'dd HH':'mm':'ss'Z'"]
]);

export const standardFormatStrings = [...standardOptions.keys(), ...standardFormats.keys()].sort((a, b) =>
    a.toLowerCase() === b.toLowerCase()
        ? (b.charCodeAt(0) - a.charCodeAt(0))
        : (a.toLowerCase().charCodeAt(0) - b.toLowerCase().charCodeAt(0))
);