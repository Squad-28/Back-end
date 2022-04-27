import request, { Request as RequestType } from 'supertest';
import { expect, test, describe } from '@jest/globals';
import { Express } from 'express';
import App from '../../../app';
import { DatabaseSingleton } from '../../../database';
import Joi from 'joi';
import { UserLevel } from '../../../entities/User';
import { TypeUser } from '../../../types/TypeUser';
import { populateTheDatabase } from '../../populateTheDatabase';
import FindAllService from '../../../services/users/FindAllService';

describe('User routes', () => {
  let app: Express;

  beforeAll(async () => {
    await DatabaseSingleton.connect();
    app = App.getInstance();
  });

  afterAll(async () => await DatabaseSingleton.close());

  afterEach(async () => {
    jest.restoreAllMocks();
    await (await DatabaseSingleton.getDataSourceInstance()).synchronize(true);
  });

  describe('GET /users', () => {
    test('Deve retornar array com usuarios cadastrados e status 200', async () => {
      await populateTheDatabase();

      const response = await request(app).get('/users');

      const userSchema = Joi.object({
        users: Joi.array().items(
          Joi.object({
            id: Joi.string().uuid().required(),
            name: Joi.string().max(100).required(),
            email: Joi.string().email().max(100).required(),
            description: Joi.string(),
            level: Joi.string().equal(
              UserLevel.TREINEE,
              UserLevel.JUNIOR,
              UserLevel.PLENO,
              UserLevel.SENIOR
            ),
            skills: Joi.array()
              .items(
                Joi.object({
                  name: Joi.string().max(100).case('upper'),
                  score: Joi.number().min(1).max(5)
                })
              )
              .max(5)
          })
        )
      });

      const usersResponse: { user: TypeUser } = response.body;

      const joiAssert = () => Joi.assert(usersResponse, userSchema);

      expect(joiAssert).not.toThrow();
      expect(response.statusCode).toEqual(200);
    });

    test('Deve retornar nenhum usuario cadastrado e status 200', async () => {
      const response = await request(app).get('/users');

      const userSchema = Joi.object({
        users: Joi.array().items().length(0).required()
      });

      const usersResponse: { user: TypeUser } = response.body;

      const joiAssert = () => Joi.assert(usersResponse, userSchema);

      expect(joiAssert).not.toThrow();
      expect(response.statusCode).toEqual(200);
    });

    test('Deve retornar erro 500', async () => {
      jest.spyOn(FindAllService.prototype, 'findAll').mockImplementation(() => {
        throw new Error('master error');
      });

      const response = await request(app).get('/users');

      const schema = Joi.object({});

      const joiAssert = () => Joi.assert(response.body, schema);

      expect(joiAssert).not.toThrow();
      expect(response.statusCode).toEqual(500);
    });
  });
});
