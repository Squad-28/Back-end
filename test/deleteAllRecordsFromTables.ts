import Knowledge from '../src/models/Knowledge';
import KnowledgeList from '../src/models/KnowledgeList';
import User from '../src/models/User';

export async function deleteAllRecordsFromTables(models = []) {
  await KnowledgeList.sync({ force: true });
  await User.sync({ force: true });
  await Knowledge.sync({ force: true });
}
