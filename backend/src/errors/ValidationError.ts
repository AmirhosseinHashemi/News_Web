import AppError from "./AppError.js";
import { ValidationErrorOptions } from "./error.types.js";

export default class ValidationError extends AppError {
  constructor({
    message = "خطا در اعتبار سنجی",
    errors = [],
  }: ValidationErrorOptions) {
    super({ message, errors, statusCode: 422 });
    this.name = "ValidationError";
  }
}
