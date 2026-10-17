import AppError from "./AppError.js";

export default class InvalidCredentialError extends AppError {
  constructor(message = "شماره همراه یا رمزعبور وارد شده صحیح نیست") {
    super({
      message,
      statusCode: 401,
      isOperational: true,
    });
    this.name = "InvalidCredentialError";
  }
}
