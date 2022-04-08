import KnowledgeList from '../models/KnowledgeList';
import { internalServerError } from '../utils/httpErrors';

class KnowledgeListRepository {
  async findAll() {
    try {
      const results = await KnowledgeList.findAll();

      return results;

    } catch (err) {
      throw internalServerError(res, err);
    }
  }
}

export default new KnowledgeListRepository();
