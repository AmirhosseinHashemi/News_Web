import AppError from "./AppError.js";

export default class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super({
      message,
      statusCode: 403,
      isOperational: true,
    });
    this.name = "ForbiddenError";
  }
}
