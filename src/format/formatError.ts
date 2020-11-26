export class FormatError extends Error {
    private static readonly defaultMessage = "Input string was not in a correct format.";

    constructor(message?: string) {
        super(message || FormatError.defaultMessage);
    }
}

export default FormatError;