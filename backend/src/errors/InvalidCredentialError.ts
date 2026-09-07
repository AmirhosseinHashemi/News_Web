import { AppError } from "./AppError.js";

export default class InvalidCredentialError extends AppError {
  constructor(message = "Invalid phone number or password") {
    super({
      message,
      statusCode: 401,
      isOperational: true,
    });
    this.name = "InvalidCredentialError";
  }
}
