class ValidationErrorException extends Error {
  constructor(data) {
    super("Validation error exception occured!");
    this.name = "ValidationErrorException";
    this.data = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationErrorException);
    }
  }
}

export default ValidationErrorException;
