import { Response } from 'express';
import ExistingEmailError from '../errors/ExistingEmailError';
import UserNotFoundError from '../errors/UserNotFoundError';

const errorMiddleware = (error: any, req: any, res: Response, next: any) => {
  console.error(error);

  let statusCode = 500;
  let message = 'Internal server error.';

  if (
    error instanceof UserNotFoundError ||
    error instanceof ExistingEmailError
  ) {
    statusCode = error.statusCode;
    message = error.message;
    return res.status(statusCode).json(message);
  }

  return res.status(500).end();
};

export default errorMiddleware;
