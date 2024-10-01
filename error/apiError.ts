class ApiError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static badRequest(message: string): ApiError {
    return new ApiError(400, message);
  }

  static internal(message: string): ApiError {
    return new ApiError(500, message);
  }

  static forbiden(message: string): ApiError {
    return new ApiError(403, message);
  }
}

export default ApiError;
