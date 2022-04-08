import bcrypt from 'bcrypt';

class BcryptEncryptionHelper {
  createPasswordHash = async (password, saltRound) =>
    bcrypt.hash(password, saltRound);

  comparePassword = async (user, password) =>
    bcrypt.compare(password, user.password);
}

export { BcryptEncryptionHelper };