import { formatDate } from "../src/dotnet-format";

// https://github.com/Kir-Antipov/dotnet-format
// https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
// https://dotnetfiddle.net/
/**
using System;
using System.Globalization;
public class Program
{
	public static void Main()
	{
		DateTime date3 = new DateTime(2024, 8, 29, 19, 27, 15);
		Console.WriteLine(date3.ToString("dd MM yyyy \\missing"));
		Console.WriteLine(date3.ToString("MM-dd-yy 'text' HH:m"));
		Console.WriteLine(date3.ToString("MM-dd-yy \\tex\\t HH:m"));
		Console.WriteLine(date3.ToString("dddd, yyyy '年' MM '月' dd '日'"));
		Console.WriteLine(date3.ToString("dddd, yyyy 年 MM 月 dd 日"));
        Console.WriteLine(date3.ToString("dd MM yyyy Q2\\\""));
        Console.WriteLine(date3.ToString("dd MM yyyy Q2\\\'"));

        DateTime date = new DateTime();
        CultureInfo frenchCulture = new CultureInfo("fr-FR");
        Console.WriteLine(date.ToString("yyyy '年' M '月' d '日', dddd - MMMM", frenchCulture));
	}
}
*/

describe("Test DotNet Number Formats", () => {
  const defaultInvalidMsg = "Input string was not in a correct format.";
  const missingQuote =
    "Cannot find a matching quote character for the character ";

  function customFormatDate(date: Date, format: string) {
    const formated = formatDate(date, format);
    // add more checks to validate the format in original library
    function checkPair(char: string) {
      // check if format ends with quote + they have a pair, if not => throw error
      if (format.endsWith(char) && !format.endsWith("\\" + char)) {
        const quoteCount = (format.match(new RegExp(char, "g")) || []).length;
        if (quoteCount % 2 !== 0) {
          throw new Error(missingQuote + `'${char}'`);
        }
      }
    }
    if (formated) {
      checkPair("'");
      checkPair('"');
    }
    return formated;
  }

  const characterLiterals = [
    "d",
    "D",
    "f",
    "F",
    "g",
    "G",
    "M",
    "m",
    "O",
    "o",
    "R",
    "r",
    "s",
    "t",
    "T",
    "u",
    "U",
    "Y",
    "y",
  ];

  const validFormats = [
    ...characterLiterals,
    // standard formats
    "dd MM yyyy",
    "d MMM yyyy",
    "dd/MM/yyyy HH:mm",
    "MM-dd-yy",
    // custom formats with quotes
    "dd MM yyyy 'today'",
    "dd MMM yyyy hh:mm tt p\\s\\t",
    "'date before:' dd MM yyyy 'Today'",
    // requested new formats
    "yyyy '年' M '月' d '日'",
    "yyyy '年'M '月' d '日'",
    "yyyy '年' M '月' dd '日'",
    "yyyy '年' MM '月' dd '日'",
    "dddd, yyyy '年' M '月' d '日'",
    "dddd, yyyy '年' MM '月' dd '日'",
    "dddd,yyyy '年' MM '月' dd '日'",
    "yyyy '年' M '月' d '日',dddd",
    "HH:mm:ss 'PM'",
    'HH:mm:ss "PM"',
    `HH:mm:ss \\'`,
    `HH:mm:ss \\"`,
  ];

  // all characters that are not in the characterLiterals above are invalid
  const invalidFormats: string[] = [];
  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(97 + i);
    if (!characterLiterals.includes(char)) {
      invalidFormats.push(char);
    }
    if (!characterLiterals.includes(char.toUpperCase())) {
      invalidFormats.push(char.toUpperCase());
    }
  }

  const customMsgFormats = [
    ['"d d', defaultInvalidMsg],
    ["dd MM yyyy 'start quote only", defaultInvalidMsg],
    ["dd MM yyyy 'missinquote", defaultInvalidMsg],
    ["dd MM yyyy missing 'quote?", defaultInvalidMsg],
    ["'quote' dd MM yyyy 'missinquote h", defaultInvalidMsg],
    ['HH:mm:ss "PM', defaultInvalidMsg],
    // test cases with missing quote (when we have last quote only)
    ["dd MM yyyy Q1'", missingQuote + `'''`],
    ['dd MM yyyy Q2"', missingQuote + `'"'`],
    ["yyyy '年' M '月 d '日'", missingQuote + `'''`],
  ];

  const date = new Date("2021-02-03T04:50:55");

  test.each(validFormats)("valid date format: %s", (format) => {
    let message: string | undefined;
    try {
      message = customFormatDate(date, format);
      //console.info("%o -> %o", format, message, message);
    } catch (error: any) {
      expect(error).toBeUndefined();
    }
    expect(message).toBeDefined();
  });

  test.each(invalidFormats)("invalid date format: %s", (format) => {
    let message: string | undefined;
    try {
      message = customFormatDate(date, format);
      //console.info(`%o should be invalid: %o`, format, message);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(defaultInvalidMsg);
    }
    expect(message).toBeUndefined();
  });

  test.each(customMsgFormats)("custom msg date format: %s", (format, msg) => {
    let message: string | undefined;
    try {
      message = customFormatDate(date, format);
    } catch (error: any) {
      expect(error).toBeDefined();
      expect(error.message).toBe(msg);
    }
    //console.info(`%o should be invalid: %o`, format, message, msg);
    expect(message).toBeUndefined();
  });
});
