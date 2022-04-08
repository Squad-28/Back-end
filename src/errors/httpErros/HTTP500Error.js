import BaseError from './BaseError';

class HTTP500Error extends BaseError {
  constructor(name, statusCode, isOperational, description) {
    super(name, statusCode, isOperational, description);

    this.name = 'Internal Server Error',
    this.statusCode = 500,
    this.isOperational = true,
    this.description = 'Internal Server Error'
  }
}

export default HTTP500Error;