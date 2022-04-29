import request from 'supertest';
import { expect, test, describe } from '@jest/globals';
import { Express } from 'express';
import App from '../../../app';
import { fakeUser } from '../../generateMock';
import { DatabaseSingleton } from '../../../database';
import Joi from 'joi';
import { User, UserLevel } from '../../../entities/User';
import { TypeUser } from '../../../types/TypeUser';
import CreateService from '../../../services/users/CreateService';
import { insertUserIntoDatabase } from '../../populateTheDatabase';
import FindAllService from '../../../services/users/FindAllService';
import { Skill } from '../../../entities/Skill';
import { SkillList } from '../../../entities/SkillList';
import FindByIdService from '../../../services/users/FindByIdService';

describe('Contrato rota de user', () => {
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
    test('Deve retornar array com 20 usuarios cadastrados e status 200', async () => {
      await insertUserIntoDatabase(30);

      const response = await request(app).get('/users');

      const userSchema = Joi.object({
        users: Joi.array()
          .items(
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
          .length(20)
      });

      const usersResponse: { user: TypeUser } = response.body;

      const joiAssert = () => Joi.assert(usersResponse, userSchema);

      expect(joiAssert).not.toThrow();
      expect(response.statusCode).toEqual(200);
    });

    test('Deve passar limit e offset corretamente e retornar 2 usuarios', async () => {
      await insertUserIntoDatabase(6);
      const response = await request(app).get('/users?limit=2&offset=2');

      const userSchema = Joi.object({
        users: Joi.array()
          .items(
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
          .length(2)
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

  describe('POST /users', () => {
    test('Deve cadastrar o usuario com skills e com status 201', async () => {
      const mockUser = fakeUser(1, 3)[0];

      const response = await request(app)
        .post('/users')
        .send({ user: mockUser });

      const userSchema = Joi.object({
        user: Joi.object({
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
      });

      const userResponse: { user: TypeUser } = response.body;

      const joiAssert = () => Joi.assert(userResponse, userSchema);

      expect(joiAssert).not.toThrow();
      expect(response.statusCode).toEqual(201);
    });

    test('Deve cadastrar o usuario sem skills, description, level e deve retornar status 201', async () => {
      const mockUser = fakeUser(1, 3)[0];
      delete mockUser.skills;
      delete mockUser.description;
      delete mockUser.level;

      const response = await request(app)
        .post('/users')
        .send({ user: mockUser });

      const userSchema = Joi.object({
        user: Joi.object({
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
      });

      const userResponse: { user: TypeUser } = response.body;
      console.log(userResponse);

      const joiAssert = () => Joi.assert(userResponse, userSchema);

      expect(joiAssert).not.toThrow();
      expect(response.statusCode).toEqual(201);
    });

    test('Deve retornar erro 500', async () => {
      const mockUser = fakeUser(1, 3)[0];

      jest.spyOn(CreateService.prototype, 'create').mockImplementation(() => {
        throw new Error('master error');
      });

      const response = await request(app)
        .post('/users')
        .send({ user: mockUser });

      const schema = Joi.object({});

      const joiAssert = () => Joi.assert(response.body, schema);

      expect(joiAssert).not.toThrow();
      expect(response.statusCode).toEqual(500);
    });

    test('Deve retornar erro 400, email já cadastrado', async () => {
      const mockUser = fakeUser()[0];
      delete mockUser.skills;

      const user = new User();
      user.setAttributes(mockUser);

      const dataSource = await DatabaseSingleton.getDataSourceInstance();
      const userRepository = dataSource.getRepository(User);
      await userRepository.save(user);

      const response = await request(app)
        .post('/users')
        .send({ user: mockUser });

      const schema = Joi.object({
        errors: Joi.array()
          .items(
            Joi.object({
              email: Joi.string().required()
            })
          )
          .required()
      }).required();

      console.log(response.body);

      const joiAssert = () => Joi.assert(response.body, schema);

      expect(joiAssert).not.toThrow();
      expect(response.statusCode).toEqual(400);
    });
  });

  describe('GET /users/:id', () => {
    async function insertInDatabase() {
      const mockUser = fakeUser(1, 2)[0];
      const skills = mockUser.skills;

      const user = new User().setAttributes(mockUser);

      const skill1 = new Skill().setAttributes(skills[0]);
      const skill2 = new Skill().setAttributes(skills[1]);

      const skillList1 = new SkillList().setAttributes(
        user,
        skill1,
        skills[0].score
      );
      const skillList2 = new SkillList().setAttributes(
        user,
        skill2,
        skills[1].score
      );

      const dataSource = await DatabaseSingleton.getDataSourceInstance();

      const { id } = await dataSource.getRepository(User).save(user);
      await dataSource.getRepository(Skill).save([skill1, skill2]);
      await dataSource.getRepository(SkillList).save([skillList1, skillList2]);

      return id;
    }

    test('Deve retornar o usuario cadastrados e status 200', async () => {
      const id = await insertInDatabase();

      const response = await request(app).get(`/users/${id}`);

      const userSchema = Joi.object({
        user: Joi.object({
          id: Joi.string().uuid().required(),
          name: Joi.string().max(100).required(),
          email: Joi.string().email().max(100).required(),
          description: Joi.string(),
          level: Joi.string()
            .equal(
              UserLevel.TREINEE,
              UserLevel.JUNIOR,
              UserLevel.PLENO,
              UserLevel.SENIOR
            )
            .required(),
          skills: Joi.array()
            .items(
              Joi.object({
                name: Joi.string().max(100).case('upper'),
                score: Joi.number().min(1).max(5)
              }).required()
            )
            .max(5)
        }).required()
      });

      const userResponse: { user: TypeUser } = response.body;

      const joiAssert = () => Joi.assert(userResponse, userSchema);

      expect(joiAssert).not.toThrow();
      expect(response.statusCode).toEqual(200);
    });

    test('Deve retornar erro 500', async () => {
      const id = 'ed3c414ece2dcb';

      jest
        .spyOn(FindByIdService.prototype, 'findById')
        .mockImplementation(() => {
          throw new Error('master error');
        });

      const response = await request(app).get(`/users/${id}`);

      const schema = Joi.object({});

      const joiAssert = () => Joi.assert(response.body, schema);

      expect(joiAssert).not.toThrow();
      expect(response.statusCode).toEqual(500);
    });

    test('Deve retornar erro 404 usuario inexistente', async () => {
      const id = 'ed3c414ece2dcb';

      const response = await request(app).get(`/users/${id}`);

      const schema = Joi.object({
        errors: Joi.array()
          .items(
            Joi.object({
              user: Joi.string().required()
            })
          )
          .required()
      }).required();

      const joiAssert = () => Joi.assert(response.body, schema);

      expect(joiAssert).not.toThrow();
      expect(response.statusCode).toEqual(404);
    });
  });
});
