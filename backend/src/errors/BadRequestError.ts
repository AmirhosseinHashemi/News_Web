import AppError from "./AppError.js";

export default class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super({
      message,
      statusCode: 400,
      isOperational: true,
    });
    this.name = "BadRequestError";
  }
}
