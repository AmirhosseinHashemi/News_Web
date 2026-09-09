import AppError from "./AppError.js";

export default class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super({
      message,
      statusCode: 401,
      isOperational: true,
    });
    this.name = "UnauthorizedError";
  }
}
