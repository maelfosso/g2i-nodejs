export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  public abstract serializeErrors(): {
    message: string;
    field?: string;
    details?: string;
  }[]
}