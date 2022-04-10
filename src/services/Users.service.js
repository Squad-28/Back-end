import UserRepo from '../repository/Users.repository';
import KnowledgeRepo from '../repository/Knowledge.repository';
import KnowledgeListRepo from '../repository/KnowledgeList.repository';
import Database from '../database';
import { v4 as uuidv4 } from 'uuid';
import { formatNamedParameters } from 'sequelize/types/utils';

import HTTP500Error from '../errors/httpErros/HTTP500Error';
import { BcryptEncryptionHelper } from '../helpers/security/BcryptEncryptionHelper';

import dontenv from 'dotenv';
dontenv.config();

const sequelize = Database.getConnection();

class UsersService {
  async create(user) {
    user.id = uuidv4();

    console.log(user);
    let knowledges = user?.knowledge;
    delete user?.knowledge;

    return;

    //array nao cadastrado, Knowledge ()
    //array nao cadastrado e cadastrado, KnowledgeList ()
    knowledges = await this.#checkIfKnowledgesExistsInDatabase(knowledges);
    return {
      knowledge: [],
      knowledgeList: [],
    };

    const transaction = await sequelize.transaction();

    try {
      await UserRepo.create(user, transaction);
      await this.#insertOrNotKnowledgeInDatabase(knowledges, transaction);
      // await this.#insertOrNotKnowledgeListInDatabase(
      //   user,
      //   knowledges,
      //   scores,
      //   transaction
      // );
      // throw new Error();
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
    console.log((await UserRepo.findAll())?.length);
    console.log((await KnowledgeRepo.findAll())?.length);
  }

  async #insertOrNotKnowledgeInDatabase(knowledges, transaction) {
    const knowledgeEmpty = knowledges?.length <= 0;
    if (knowledgeEmpty) return;

    await KnowledgeRepo.bulkCreate(knowledges, transaction);
    // await KnowledgeListDAO.createAll(user, inexistentKnowledge);
  }

  async #checkIfKnowledgesExistsInDatabase(knowledges) {
    const knowledgeEmpty = knowledges?.length <= 0;
    if (knowledgeEmpty) return;

    const formatedKnowledges = this.#formatKnowledges(knowledges);

    const inexistentKnowledge = await this.#getKnowledgeNotExistingInDatabase(
      formatedKnowledges
    );

    return inexistentKnowledge;
  }

  async #getKnowledgeNotExistingInDatabase(knowledges) {
    const names = this.#createSingleStringWithKnowledgeNames(knowledges);

    const existingKnowledges = await KnowledgeRepo.findByName(names);

    const arrayEmpty = existingKnowledges.length <= 0;

    if (arrayEmpty)
      return this.#generateArraysToInsertIntoDatabase(user, knowledges);

    //se nao existe, retorna o antigo pro Know, pro KnowList gera
    //se existir, adiciona so os q n existe no Know, junta existente e nao existent pro KnowList

    //filtra os que tem nome diferente e adiciona no bd Knowledge
    //cria array com todos os ids e scores para KnowledgeList

    return this.#generateArraysToInsertIntoDatabase(
      user,
      knowledges,
      existingKnowledges
    );
  }

  #generateArraysToInsertIntoDatabase(
    user,
    knowledges,
    existingKnowledges = []
  ) {
    const toInsertInKnowledgeListTable = knowledges.map((knowledge) => {
      return {
        id_user: user.id,
        id_knowledge: knowledge.id,
        score: knowledge.score,
      };
    });

    const toInsertInKnowledgeTable = knowledges.map((knowledge) => {
      return {
        id: knowledge.id,
        name: knowledge.name,
      };
    });

    return {
      toInsertInKnowledgeTable,
      toInsertInKnowledgeListTable,
    };
  }

  #createSingleStringWithKnowledgeNames(knowledges) {
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

  #formatKnowledges(knowledges) {
    const scores = [];
    return knowledges.map((knowledge) => {
      knowledge.name = knowledge.name.toUpperCase();
      knowledge.id = uuidv4();
      scores.push(knowledge.score);
      delete knowledge.score;

      return knowledge;
    });
  }
}

export default new UsersService();
