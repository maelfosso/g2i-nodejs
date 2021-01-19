import { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "../errors/authentication-error";

const AUTH_TOKEN = 'XbPfbIHMI6arZ3Y922Bh';

const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers["authorization"] ; 

  if (authorization !== AUTH_TOKEN) {
    throw new AuthenticationError();
  }

  next();
}

export { requireAuth };
