import { CustomError } from "./custom-error";

export class DatabaseError extends CustomError {
  statusCode = 500;

  constructor(public message: string, public details: string) {
    super('Error occured during a database operation');

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, details: this.details }]
  }
}