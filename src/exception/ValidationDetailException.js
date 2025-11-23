class ValidationDetailException extends Error {
  constructor(data) {
    super("Validation detail exception occured!");
    this.name = "ValidationDetailException";
    this.data = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationDetailException);
    }
  }
}

export default ValidationDetailException;
