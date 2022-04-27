export default class UserNotFoundError extends Error {
  public statusCode: number;
  public message: any = { errors: [] };

  constructor() {
    super();
    this.statusCode = 404;
    this.message.errors.push({ user: 'Usuário não encontrado.' });
  }
}
