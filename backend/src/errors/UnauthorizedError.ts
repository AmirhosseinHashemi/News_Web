import AppError from "./AppError.js";

export default class UnauthorizedError extends AppError {
  constructor(message = "عدم احرازهویت") {
    super({
      message,
      statusCode: 401,
      isOperational: true,
    });
    this.name = "UnauthorizedError";
  }
}
