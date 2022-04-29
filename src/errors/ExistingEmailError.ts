export default class ExistingEmailError extends Error {
  public statusCode: number;
  public message: any = { errors: [] };

  constructor() {
    super();
    this.statusCode = 400;
    this.message.errors.push({ email: 'Email já existe.' });
  }
}
