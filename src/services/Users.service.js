import { v4 as uuidv4 } from 'uuid';

import HTTP500Error from '../errors/httpErrors/HTTP500Error';
import { BcryptEncryptionHelper } from '../helpers/security/BcryptEncryptionHelper';

import dontenv from 'dotenv';
dontenv.config();

class UsersService {
  #sequelize;
  #usersRepo;
  #knowledgeRepo;
  #knowledgeListRepo;

  constructor(sequelize, usersRepo, knowledgeRepo, knowledgeListRepo) {
    this.#sequelize = sequelize;
    this.#usersRepo = usersRepo;
    this.#knowledgeRepo = knowledgeRepo;
    this.#knowledgeListRepo = knowledgeListRepo;
  }

  async create(user) {
    user.id = uuidv4();

    let knowledges = user?.knowledge;
    delete user?.knowledge;

    const formatedKnowledges = this.#formatKnowledges(knowledges);
    // console.log('formatedKnowledges', formatedKnowledges);

    const existingKnowledges = await this.#getKnowledgesExistingInDatabase(
      formatedKnowledges
    );
    // console.log('existingKnowledges', existingKnowledges);

    const arraysToInsertInTables = this.#createArraysToInsertInTables(
      user,
      formatedKnowledges,
      existingKnowledges
    );
    // console.log('arraysToInsertInTables', arraysToInsertInTables);

    const transaction = await this.#sequelize.transaction();

    try {
      const { toInsertInKnowledgeTable, toInsertInKnowledgeListTable } =
        arraysToInsertInTables;

      await this.#usersRepo.create(user, transaction);

      await this.#insertOrNotKnowledgeInDatabase(
        toInsertInKnowledgeTable,
        transaction
      );

      await this.#insertOrNotKnowledgeListInDatabase(
        toInsertInKnowledgeListTable,
        transaction
      );

      // throw new Error();
      await transaction.commit();
    } catch (error) {
      console.error(error);
      await transaction.rollback();
      throw error;
    }
  }

  #formatKnowledges(knowledges = []) {
    if (this.#knowledgesIsEmpty(knowledges)) return [];

    return knowledges.map((knowledge) => {
      knowledge.name = knowledge.name.toUpperCase();
      knowledge.id = uuidv4();
      return knowledge;
    });
  }

  async #insertOrNotKnowledgeInDatabase(knowledges, transaction) {
    if (this.#knowledgesIsEmpty(knowledges)) return [];

    return await this.#knowledgeRepo.bulkCreate(knowledges, transaction);
  }

  async #insertOrNotKnowledgeListInDatabase(knowledgesList, transaction) {
    if (this.#knowledgesIsEmpty(knowledgesList)) return [];

    return await this.#knowledgeListRepo.bulkCreate(
      knowledgesList,
      transaction
    );
  }

  async #getKnowledgesExistingInDatabase(knowledges = []) {
    if (this.#knowledgesIsEmpty(knowledges)) return [];

    const names = this.#createSingleStringWithKnowledgeNames(knowledges);

    const existingKnowledges = await this.#knowledgeRepo.findByName(names);

    return existingKnowledges;
  }

  #createSingleStringWithKnowledgeNames(knowledges = []) {
    let thisIsTheLastIndex = false;
    let arrayLength = knowledges.length;

    const names = knowledges.reduce((finalName, knowledge, index) => {
      thisIsTheLastIndex = index + 1 >= arrayLength;

      if (thisIsTheLastIndex) {
        finalName += `'${knowledge.name}'`;
      } else {
        finalName += `'${knowledge.name}',`;
      }

      return finalName;
    }, '');
    return names;
  }

  #createArraysToInsertInTables(user, knowledges, existingKnowledges = []) {
    const existKnowledgeInDatabase = existingKnowledges?.length <= 0;

    if (existKnowledgeInDatabase)
      return this.#createArraysIfKnowledgeIsNotRegistered(user, knowledges);

    return this.#createArraysIfKnowledgeIsAlreadyRegistered(
      user,
      knowledges,
      existingKnowledges
    );
  }

  #createArraysIfKnowledgeIsNotRegistered(user, knowledges = []) {
    const toInsertInKnowledgeListTable = [];
    const toInsertInKnowledgeTable = [];

    knowledges.forEach((knowledge) => {
      toInsertInKnowledgeListTable.push({
        id_user: user.id,
        id_knowledge: knowledge.id,
        score: knowledge.score,
      });

      toInsertInKnowledgeTable.push({
        id: knowledge.id,
        name: knowledge.name,
      });
    });

    return {
      toInsertInKnowledgeTable,
      toInsertInKnowledgeListTable,
    };
  }

  #createArraysIfKnowledgeIsAlreadyRegistered(
    user,
    knowledges = [],
    existingKnowledges = []
  ) {
    let toInsertInKnowledgeTable = JSON.parse(JSON.stringify(knowledges));
    let toInsertInKnowledgeListTable = [];

    existingKnowledges.forEach((existing) => {
      toInsertInKnowledgeTable = toInsertInKnowledgeTable.filter(
        (toInsert) => toInsert.name !== existing.name
      );
    });

    const knowledgesWithRightId = [
      ...toInsertInKnowledgeTable,
      ...existingKnowledges,
    ];

    let knowledgeFound;
    toInsertInKnowledgeListTable = knowledges.map((oldKnowledge) => {
      knowledgeFound = knowledgesWithRightId.find(
        (newKnowledge) => newKnowledge.name === oldKnowledge.name
      );

      return {
        id_user: user.id,
        id_knowledge: knowledgeFound.id,
        score: oldKnowledge.score,
      };
    });

    return {
      toInsertInKnowledgeTable,
      toInsertInKnowledgeListTable,
    };
  }

  #knowledgesIsEmpty(knowledges) {
    return knowledges?.length <= 0;
  }
}

export default UsersService;
