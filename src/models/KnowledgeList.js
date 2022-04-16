import { Model, DataTypes } from 'sequelize';
import 'dotenv/config';

class KnowledgeList extends Model {
  static init(sequelize) {
    const isTestEnv = process.env.NODE_ENV === 'test';

    const scoreType = isTestEnv
      ? DataTypes.INTEGER(1)
      : DataTypes.INTEGER(1).UNSIGNED.ZEROFILL;

    super.init(
      {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        id_user: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            key: 'id',
            model: 'users',
          },
        },
        id_knowledge: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            key: 'id',
            model: 'knowledges',
          },
        },
        score: {
          type: scoreType,
          allowNull: true,
          defaultValue: 1,
        },
      },
      {
        tableName: 'knowledge_list',
        timestamps: false,
        sequelize,
      }
    );
  }
}

export default KnowledgeList;
