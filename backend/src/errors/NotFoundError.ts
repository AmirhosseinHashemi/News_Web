import AppError from "./AppError.js";

export default class NotFoundError extends AppError {
  constructor(message = "منبع یافت نشد") {
    super({
      message,
      statusCode: 404,
      isOperational: true,
    });
    this.name = "NotFoundError";
  }
}
