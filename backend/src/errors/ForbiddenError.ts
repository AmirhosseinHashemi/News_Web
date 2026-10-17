import AppError from "./AppError.js";

export default class ForbiddenError extends AppError {
  constructor(message = "ممنوع") {
    super({
      message,
      statusCode: 403,
      isOperational: true,
    });
    this.name = "ForbiddenError";
  }
}
