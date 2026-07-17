class ApiError extends Error {
  constructor(statusCode, message, errors = null) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
    this.errors = errors;
    this.timestamp = new Date().toISOString();

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      success: false,
      statusCode: this.statusCode,
      message: this.message,
      ...(this.errors ? { errors: this.errors } : {}),
      timestamp: this.timestamp,
    };
  }
}

export default ApiError;