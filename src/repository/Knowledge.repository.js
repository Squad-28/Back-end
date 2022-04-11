const formatReturn = (result) => {
  const data = result.dataValues;
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
    }
  }

  async findByName(names) {
    const conn = database.getConnection();
    const query = `SELECT id, name FROM Knowledges WHERE name IN (${names});`;
    const result = await conn.query(query);
    console.log(result);
  }

  async bulkCreate(knowledges, transaction = null) {
    try {
      return await this.#Knowledge.bulkCreate(knowledges, {
        transaction,
      });
    } catch (error) {
      console.error('[ERRO NO BD, BULK CREATE]: ' + error);
    }
  }
}

export default KnowledgeRepository;
