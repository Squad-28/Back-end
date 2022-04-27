import { NextFunction, Request, Response } from 'express';
import { DatabaseSingleton } from '../database';
import SkillListRepository from '../repositories/SkillListRepository';
import SkillRepository from '../repositories/SkillRepository';
import UserRepository from '../repositories/UserRepository';
import CreateService from '../services/users/CreateService';
import FindAllService from '../services/users/FindAllService';
import FindByIdService from '../services/users/FindByIdService';
import { TypeUser } from '../types/TypeUser';

async function getCreateService() {
  return new CreateService(
    await DatabaseSingleton.getDataSourceInstance(),
    new UserRepository(),
    new SkillRepository(),
    new SkillListRepository()
  );
}

async function getFindAllService() {
  return new FindAllService(new UserRepository());
}
async function getFindByIdService() {
  return new FindByIdService(new UserRepository());
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  const newUser: TypeUser = req.body.user;

  const createService = await getCreateService();

  try {
    const user = await createService.create(newUser);

    return res.status(201).json({ user });
  } catch (error) {
    console.error(error);

    next(error);
  }
}

export async function findAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  const findAllService = await getFindAllService();
  try {
    const users = await findAllService.findAll();

    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function findById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  const { id } = req.params;
  const findByIdService = await getFindByIdService();

  try {
    const user = await findByIdService.findById(id);

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
