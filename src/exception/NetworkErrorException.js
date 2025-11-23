class NetworkErrorException extends Error {
  constructor(data) {
    super("Network error exception occured!");
    this.name = "NetworkErrorException";
    this.data = data;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NetworkErrorException);
    }
  }
}

export default NetworkErrorException;
