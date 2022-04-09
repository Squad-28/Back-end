import database from '../database';
import Knowledge from '../models/Knowledge';

const formatReturn = (result) => {
  const data = result.dataValues;
  delete data?.createdAt;
  delete data?.updatedAt;
  return data;
};

class KnowledgeRepository {
  async findAll() {
    try {
      const result = await Knowledge.findAll();

      const arrrayEmpty = result.length <= 0;
      if (arrrayEmpty) return result;

      const knowledges = result.map(formatReturn);

      // console.log('knowledges: ', knowledges);

      return knowledges;
    } catch (error) {
      console.log('[ERRO NO BD, FIND ALL]: ' + error);
    }
  }

  async bulkCreate(knowledges, transaction = null) {
    try {
      await Knowledge.bulkCreate(knowledges, {
        transaction,
      });
    } catch (error) {
      console.log('[ERRO NO BD, BULK CREATE]: ' + error);
    }
  }
}

export default new KnowledgeRepository();
