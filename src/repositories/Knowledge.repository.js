const formatReturn = (result) => {
  const data = result?.dataValues;
  delete data?.createdAt;
  delete data?.updatedAt;
  return data;
};

class KnowledgeRepository {
  #Knowledge;
  #sequelize;
  constructor(Knowledge, sequelize) {
    this.#Knowledge = Knowledge;
    this.#sequelize = sequelize;
  }

  async index() {
    try {
      const result = await this.#Knowledge.findAll();

      const arrrayEmpty = result.length <= 0;
      if (arrrayEmpty) return result;

      const knowledges = result.map(formatReturn);

      return knowledges;
    } catch (error) {
      console.error('[ERRO NO BD, FIND ALL]: ' + error);
      throw error;
    }
  }

  async findByName(names) {
    try {
      const query = `SELECT id, name FROM knowledges WHERE name IN (${names});`;
      const result = await this.#sequelize.query(query);
      console.log('result', result);
      return result;
    } catch (error) {
      console.error('[ERRO NO BD, BULK CREATE]: ' + error);
      throw error;
    }
  }

  async bulkCreate(knowledges, transaction = null) {
    try {
      return await this.#Knowledge.bulkCreate(knowledges, {
        transaction,
      });
    } catch (error) {
      console.error('[ERRO NO BD, BULK CREATE]: ' + error);
      throw error;
    }
  }
}

export default KnowledgeRepository;
