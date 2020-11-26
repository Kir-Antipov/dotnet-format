# dotnet-format

 [![npm: dotnet-format][1]][2]
 [![License][3]][4]

It's 2020, and we still have no built-in tools to convert a date, number, or any other entity into a string using a custom format. Since I often write .NET programs, it looks like wildness to me, so I decided to port awesome .NET formatting operations for JS environment.

## Table of Contents

1. [Installation](#installation)
2. [Date formatting operations](#date-formatting-operations)
    1. [Examples](#date-examples)
    2. [Standard date and time format strings](#date-standard-formats)
    3. [Custom date and time format strings](#date-custom-formats)

## Installation

```
npm i dotnet-format
```

## Date formatting operations

<h3 id="date-examples">Examples</h3>

There're 3 ways to format date with this package.

1) Import `formatDate(date: Date, format: string, culture?: string)` function from the main module:

```js
import { formatDate } from "dotnet-format";

let date = new Date(0);

console.log(formatDate(date, "dd MM yyyy")); // 01 01 1970
console.log(formatDate(date, "d MMM yyyy")); // 1 Jan 1970
console.log(formatDate(date, "d MMM yyyy", "fr")); // 1 janv. 1970
console.log(formatDate(date, "dd/MM/yyyy HH:mm")); // 01/01/1970 00:00
console.log(formatDate(date, "U")); // Thursday, January 01, 1970, 12:00:00 AM
```

2) Extend date protototype with `format(format: string, culture?: string)` function:
```js
import * from "dotnet-format/extensions/date/format";

let date = new Date(0);

console.log(date.format("dd MM yyyy")); // 01 01 1970
console.log(date.format("d MMM yyyy")); // 1 Jan 1970
console.log(date.format("d MMM yyyy", "fr")); // 1 janv. 1970
console.log(date.format("dd/MM/yyyy HH:mm")); // 01/01/1970 00:00
console.log(date.format("U")); // Thursday, January 01, 1970, 12:00:00 AM
```

3) Extend date protototype with `toString(format?: string, culture?: string)` function:
```js
import * from "dotnet-format/extensions/date/toString";

let date = new Date(0);

console.log(date.toString("dd MM yyyy")); // 01 01 1970
console.log(date.toString("d MMM yyyy")); // 1 Jan 1970
console.log(date.toString("d MMM yyyy", "fr")); // 1 janv. 1970
console.log(date.toString("dd/MM/yyyy HH:mm")); // 01/01/1970 00:00
console.log(date.toString("U")); // Thursday, January 01, 1970, 12:00:00 AM
```

<h3 id="date-standard-formats">Standard date and time format strings</h3>

A standard date and time format string uses a single character as the format specifier to define the text representation of a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) value. Any date and time format string that contains more than one character, including white space, is interpreted as a [custom date and time format string](#date-custom-formats).

The following table describes the standard date and time format specifiers:

| Format specifier | Description | Examples |
| ---------------- | ----------- | -------- |
| "d"      | Short date pattern. | 2009-06-15T13:45:30 -> 6/15/2009 (en-US)<br><br>2009-06-15T13:45:30 -> 15/06/2009 (fr-FR)<br><br>2009-06-15T13:45:30 -> 2009/06/15 (ja-JP) |
| "D"      | Long date pattern. | 2009-06-15T13:45:30 -> Monday, June 15, 2009 (en-US)<br><br>2009-06-15T13:45:30 -> 15 июня 2009 г. (ru-RU)<br><br>2009-06-15T13:45:30 -> Montag, 15. Juni 2009 (de-DE) |
| "f"      | Full date/time pattern (short time). | 2009-06-15T13:45:30 -> Monday, June 15, 2009 1:45 PM (en-US)<br><br>2009-06-15T13:45:30 -> den 15 juni 2009 13:45 (sv-SE)<br><br>2009-06-15T13:45:30 -> Δευτέρα, 15 Ιουνίου 2009 1:45 μμ (el-GR) |
| "F"      | Full date/time pattern (long time). | 2009-06-15T13:45:30 -> Monday, June 15, 2009 1:45:30 PM (en-US)<br><br>2009-06-15T13:45:30 -> den 15 juni 2009 13:45:30 (sv-SE)<br><br>2009-06-15T13:45:30 -> Δευτέρα, 15 Ιουνίου 2009 1:45:30 μμ (el-GR) |
| "g"      | General date/time pattern (short time). | 2009-06-15T13:45:30 -> 6/15/2009 1:45 PM (en-US)<br><br>2009-06-15T13:45:30 -> 15/06/2009 13:45 (es-ES)<br><br>2009-06-15T13:45:30 -> 2009/6/15 13:45 (zh-CN) |
| "G"      | General date/time pattern (long time). | 2009-06-15T13:45:30 -> 6/15/2009 1:45:30 PM (en-US)<br><br>2009-06-15T13:45:30 -> 15/06/2009 13:45:30 (es-ES)<br><br>2009-06-15T13:45:30 -> 2009/6/15 13:45:30 (zh-CN) |
| "M", "m" | Month/day pattern. | 2009-06-15T13:45:30 -> June 15 (en-US)<br><br>2009-06-15T13:45:30 -> 15. juni (da-DK)<br><br>2009-06-15T13:45:30 -> 15 Juni (id-ID) |
| "O", "o" | round-trip date/time pattern. | 2009-06-15T13:45:30 -> 2009-06-15T13:45:30.0000000-07:00<br><br>2009-06-15T13:45:30 -> 2009-06-15T13:45:30.0000000Z<br><br>2009-06-15T13:45:30 -> 2009-06-15T13:45:30.0000000 |
| "R", "r" | RFC1123 pattern. | 2009-06-15T13:45:30 -> Mon, 15 Jun 2009 20:45:30 GMT |
| "s"      | Sortable date/time pattern. | 2009-06-15T13:45:30 -> 2009-06-15T13:45:30<br><br>2009-06-15T13:45:30 -> 2009-06-15T13:45:30 |
| "t"      | Short time pattern. | 2009-06-15T13:45:30 -> 1:45 PM (en-US)<br><br>2009-06-15T13:45:30 -> 13:45 (hr-HR)<br><br>2009-06-15T13:45:30 -> 01:45 م (ar-EG) |
| "T"      | Long time pattern. | 2009-06-15T13:45:30 -> 1:45:30 PM (en-US)<br><br>2009-06-15T13:45:30 -> 13:45:30 (hr-HR)<br><br>2009-06-15T13:45:30 -> 01:45:30 م (ar-EG) |
| "u"      | Universal sortable date/time pattern. | 2009-06-15T13:45:30 -> 2009-06-15 13:45:30Z |
| "U"      | Universal full date/time pattern. | 2009-06-15T13:45:30 -> Monday, June 15, 2009 8:45:30 PM (en-US)<br><br>2009-06-15T13:45:30 -> den 15 juni 2009 20:45:30 (sv-SE)<br><br>2009-06-15T13:45:30 -> Δευτέρα, 15 Ιουνίου 2009 8:45:30 μμ (el-GR) |
| "Y", "y" | Year month pattern. | 2009-06-15T13:45:30 -> June 2009 (en-US)<br><br>2009-06-15T13:45:30 -> juni 2009 (da-DK)<br><br>2009-06-15T13:45:30 -> Juni 2009 (id-ID) |
| Any other single character | Unknown specifier. | Throws a `FormatError`. |

<sup><a href="https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings" target="_blank">More info</a></sup>

<h3 id="date-custom-formats">Custom date and time format strings</h3>

A date and time format string defines the text representation of a [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) value that results from a formatting operation. A custom format string consists of one or more custom date and time format specifiers. Any string that is not a [standard date and time format string](#date-standard-formats) is interpreted as a custom date and time format string.

The following table describes the custom date and time format specifiers and displays a result string produced by each format specifier:

| Format specifier | Description | Examples |
| ---------------- | ----------- | -------- |
| "d" | The day of the month, from 1 through 31. | 2009-06-01T13:45:30 -> 1<br><br>2009-06-15T13:45:30 -> 15 |
| "dd" | The day of the month, from 01 through 31. | 2009-06-01T13:45:30 -> 01<br><br>2009-06-15T13:45:30 -> 15 |
| "ddd" | The abbreviated name of the day of the week. | 2009-06-15T13:45:30 -> Mon (en-US)<br><br>2009-06-15T13:45:30 -> Пн (ru-RU)<br><br>2009-06-15T13:45:30 -> lun. (fr-FR) |
| "dddd" | The full name of the day of the week. | 2009-06-15T13:45:30 -> Monday (en-US)<br><br>2009-06-15T13:45:30 -> понедельник (ru-RU)<br><br>2009-06-15T13:45:30 -> lundi (fr-FR) |
| "f" | The tenths of a second in a date and time value. | 2009-06-15T13:45:30.6170000 -> 6<br><br>2009-06-15T13:45:30.05 -> 0 |
| "ff" | The hundredths of a second in a date and time value. | 2009-06-15T13:45:30.6170000 -> 61<br><br>2009-06-15T13:45:30.0050000 -> 00 |
| "fff" | The milliseconds in a date and time value. | 6/15/2009 13:45:30.617 -> 617<br><br>6/15/2009 13:45:30.0005 -> 000 |
| "ffff" | The ten thousandths of a second in a date and time value. | 2009-06-15T13:45:30.6175000 -> 6175<br><br>2009-06-15T13:45:30.0000500 -> 0000 |
| "fffff" | The hundred thousandths of a second in a date and time value. | 2009-06-15T13:45:30.6175400 -> 61754<br><br>6/15/2009 13:45:30.000005 -> 00000 |
| "ffffff" | The millionths of a second in a date and time value. | 2009-06-15T13:45:30.6175420 -> 617542<br><br>2009-06-15T13:45:30.0000005 -> 000000 |
| "fffffff" | The ten millionths of a second in a date and time value. | 2009-06-15T13:45:30.6175425 -> 6175425<br><br>2009-06-15T13:45:30.0001150 -> 0001150 |
| "F" | If non-zero, the tenths of a second in a date and time value. | 2009-06-15T13:45:30.6170000 -> 6<br><br>2009-06-15T13:45:30.0500000 -> (no output) |
| "FF" | If non-zero, the hundredths of a second in a date and time value. | 2009-06-15T13:45:30.6170000 -> 61<br><br>2009-06-15T13:45:30.0050000 -> (no output) |
| "FFF" | If non-zero, the milliseconds in a date and time value. | 2009-06-15T13:45:30.6170000 -> 617<br><br>2009-06-15T13:45:30.0005000 -> (no output) |
| "FFFF" | If non-zero, the ten thousandths of a second in a date and time value. | 2009-06-15T13:45:30.5275000 -> 5275<br><br>2009-06-15T13:45:30.0000500 -> (no output) |
| "FFFFF" | If non-zero, the hundred thousandths of a second in a date and time value. | 2009-06-15T13:45:30.6175400 -> 61754<br><br>2009-06-15T13:45:30.0000050 -> (no output) |
| "FFFFFF" | If non-zero, the millionths of a second in a date and time value. | 2009-06-15T13:45:30.6175420 -> 617542<br><br>2009-06-15T13:45:30.0000005 -> (no output) |
| "FFFFFFF" | If non-zero, the ten millionths of a second in a date and time value. | 2009-06-15T13:45:30.6175425 -> 6175425<br><br>2009-06-15T13:45:30.0001150 -> 000115 |
| "g", "gg" | The period or era. | 2009-06-15T13:45:30.6170000 -> A.D. |
| "h" | The hour, using a 12-hour clock from 1 to 12. | 2009-06-15T01:45:30 -> 1<br><br>2009-06-15T13:45:30 -> 1 |
| "hh" | The hour, using a 12-hour clock from 01 to 12. | 2009-06-15T01:45:30 -> 01<br><br>2009-06-15T13:45:30 -> 01 |
| "H" | The hour, using a 24-hour clock from 0 to 23. | 2009-06-15T01:45:30 -> 1<br><br>2009-06-15T13:45:30 -> 13 |
| "HH" | The hour, using a 24-hour clock from 00 to 23. | 2009-06-15T01:45:30 -> 01<br><br>2009-06-15T13:45:30 -> 13 |
| "K" | Time zone information. | 2009-06-15T13:45:30 -> -07:00 (depends on local computer settings)<br><br>2009-06-15T08:45:30+00:00 --> +00:00 |
| "m" | The minute, from 0 through 59. | 2009-06-15T01:09:30 -> 9<br><br>2009-06-15T13:29:30 -> 29 |
| "mm" | The minute, from 00 through 59. | 2009-06-15T01:09:30 -> 09<br><br>2009-06-15T01:45:30 -> 45 |
| "M" | The month, from 1 through 12. | 2009-06-15T13:45:30 -> 6 |
| "MM" | The month, from 01 through 12. | 2009-06-15T13:45:30 -> 06 |
| "MMM" | The abbreviated name of the month. | 2009-06-15T13:45:30 -> Jun (en-US)<br><br>2009-06-15T13:45:30 -> juin (fr-FR)<br><br>2009-06-15T13:45:30 -> Jun (zu-ZA) |
| "MMMM" | The full name of the month. | 2009-06-15T13:45:30 -> June (en-US)<br><br>2009-06-15T13:45:30 -> juni (da-DK)<br><br>2009-06-15T13:45:30 -> uJuni (zu-ZA) |
| "s" | The second, from 0 through 59. | 2009-06-15T13:45:09 -> 9 |
| "ss" | The second, from 00 through 59. | 2009-06-15T13:45:09 -> 09 |
| "t" | The first character of the AM/PM designator. | 2009-06-15T13:45:30 -> P (en-US)<br><br>2009-06-15T13:45:30 -> 午 (ja-JP)<br><br>2009-06-15T13:45:30 -> (fr-FR) |
| "tt" | The AM/PM designator. | 2009-06-15T13:45:30 -> PM (en-US)<br><br>2009-06-15T13:45:30 -> 午後 (ja-JP)<br><br>2009-06-15T13:45:30 -> (fr-FR) |
| "y" | The year, from 0 to 99. | 0001-01-01T00:00:00 -> 1<br><br>0900-01-01T00:00:00 -> 0<br><br>1900-01-01T00:00:00 -> 0<br><br>2009-06-15T13:45:30 -> 9<br><br>2019-06-15T13:45:30 -> 19 |
| "yy" | The year, from 00 to 99. | 0001-01-01T00:00:00 -> 01<br><br>0900-01-01T00:00:00 -> 00<br><br>1900-01-01T00:00:00 -> 00<br><br>2019-06-15T13:45:30 -> 19 |
| "yyy" | The year, with a minimum of three digits. | 0001-01-01T00:00:00 -> 001<br><br>0900-01-01T00:00:00 -> 900<br><br>1900-01-01T00:00:00 -> 1900<br><br>2009-06-15T13:45:30 -> 2009 |
| "yyyy" | The year as a four-digit number. | 0001-01-01T00:00:00 -> 0001<br><br>0900-01-01T00:00:00 -> 0900<br><br>1900-01-01T00:00:00 -> 1900<br><br>2009-06-15T13:45:30 -> 2009 |
| "yyyyy" | The year as a five-digit number. | 0001-01-01T00:00:00 -> 00001<br><br>2009-06-15T13:45:30 -> 02009 |
| "z" | Hours offset from UTC, with no leading zeros. | 2009-06-15T13:45:30-07:00 -> -7 |
| "zz" | Hours offset from UTC, with a leading zero for a single-digit value. | 2009-06-15T13:45:30-07:00 -> -07 |
| "zzz" | Hours and minutes offset from UTC. | 2009-06-15T13:45:30-07:00 -> -07:00 |
| ":" | The time separator. | 2009-06-15T13:45:30 -> : (en-US)<br><br>2009-06-15T13:45:30 -> . (it-IT)<br><br>2009-06-15T13:45:30 -> : (ja-JP) |
| "/" | The date separator. | 2009-06-15T13:45:30 -> / (en-US)<br><br>2009-06-15T13:45:30 -> - (ar-DZ)<br><br>2009-06-15T13:45:30 -> . (tr-TR) |
| "string"<br><br>'string' | Literal string delimiter. | 2009-06-15T13:45:30 ("arr:" h:m t) -> arr: 1:45 P<br><br>2009-06-15T13:45:30 ('arr:' h:m t) -> arr: 1:45 P |
| % | Defines the following character as a custom format specifier. | 2009-06-15T13:45:30 (%h) -> 1 |
| \ | The escape character. | 2009-06-15T13:45:30 (h \h) -> 1 h |
| Any other character | The character is copied to the result string unchanged. | 2009-06-15T01:45:30 (arr hh:mm t) -> arr 01:45 A |

<sup><a href="https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings" target="_blank">More info</a></sup>

[1]: https://img.shields.io/npm/v/dotnet-format.svg?label=dotnet-format&cacheSeconds=3600
[2]: https://www.npmjs.com/package/dotnet-format

[3]: https://img.shields.io/github/license/Kir-Antipov/dotnet-format.svg?label=License&cacheSeconds=36000
[4]: https://raw.githubusercontent.com/Kir-Antipov/dotnet-format/master/LICENSE.md