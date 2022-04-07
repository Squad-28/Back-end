import { Model, DataTypes } from 'sequelize';

class KnowledgeList extends Model {
  static init(sequelize) {
    super.init(
      {
        id_user: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        id_knowledge: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        knowledge_level: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
        },
      },
      {
        sequelize,
        name: {
          singular: 'knowledge_list',
          plural: 'knowledge_list',
        },
      }
    );
  }
}

export default KnowledgeList;
