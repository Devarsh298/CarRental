class ApiError extends Error {
  constructor(
    StatusCode,
    message = "Something Went Wrong",
    error = [],
    stack = ""
  ) {
    super(message);
    this.StatusCode = StatusCode;
    this.data = null;
    this.message = message;
    this.succcess = false;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
