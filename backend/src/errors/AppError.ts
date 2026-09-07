import { AppErrorOptions, FieldError } from "./error.types.js";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errors: FieldError[];
  public readonly isOperational: boolean;

  constructor({
    message = "Something went wrong",
    statusCode = 500,
    errors = [],
    isOperational = true,
  }: AppErrorOptions = {}) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
