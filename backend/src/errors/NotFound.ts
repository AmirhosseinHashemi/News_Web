import { AppError } from "./AppError.js";

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super({
      message,
      statusCode: 404,
      isOperational: true,
    });
    this.name = "NotFoundError";
  }
}
