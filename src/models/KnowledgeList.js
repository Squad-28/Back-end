import { Model, DataTypes } from 'sequelize';

class KnowledgeList extends Model {
  static init(sequelize) {
    super.init(
      {
        id_user: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            key: 'id',
            model: 'users',
          },
        },
        id_knowledge: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          references: {
            key: 'id',
            model: 'knowledges',
          },
        },
        score: {
          type: DataTypes.INTEGER(1).UNSIGNED.ZEROFILL,
          allowNull: false,
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
