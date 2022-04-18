class KnowledgeListRepository {
  #KnowledgeList;

  constructor(KnowledgeList) {
    this.#KnowledgeList = KnowledgeList;
  }

  async bulkCreate(knowledges, transaction = null) {
    try {
      return await this.#KnowledgeList.bulkCreate(knowledges, {
        transaction,
      });
    } catch (error) {
      console.log('[ERRO NO BD, BULK CREATE]: ' + error);

      throw error;
    }
  }
}

export default KnowledgeListRepository;
