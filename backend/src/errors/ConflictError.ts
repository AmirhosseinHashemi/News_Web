import AppError from "./AppError.js";
import { ConfilictErrorOption } from "./error.types.js";

export default class ConflictError extends AppError {
  constructor({
    message = "Resource already exists",
    errors = [],
  }: ConfilictErrorOption) {
    super({
      message,
      errors,
      statusCode: 409,
      isOperational: true,
    });
    this.name = "ConflictError";
  }
}
