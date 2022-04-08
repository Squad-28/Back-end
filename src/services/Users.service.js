import UserRepo from '../repository/Users.repository';
import { v4 as uuidv4 } from 'uuid';

import HTTP500Error from '../errors/httpErros/HTTP500Error';
import { BcryptEncryptionHelper } from '../helpers/security/BcryptEncryptionHelper';

import dontenv from 'dotenv';
dontenv.config();

class UsersService {}

export default new UsersService();
