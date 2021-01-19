import { CustomError } from "./custom-error";

export class AuthenticationError extends CustomError {
  statusCode = 403;

  constructor() {
    super('Authentication Error! Need to provide authentication token !');

    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }]
  }
}