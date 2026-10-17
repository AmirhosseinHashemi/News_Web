import AppError from "./AppError.js";
import { ConfilictErrorOption } from "./error.types.js";

export default class ConflictError extends AppError {
  constructor({
    message = "منبع از قبل وجود دارد",
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
