import { Model, DataTypes } from 'sequelize';

class Knowledge extends Model {
  static init(sequelize) {
    super.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
            name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        }
    },
    {
      sequelize,
      name: {
        singular: 'knowledge',
        plural: 'knowledges',
      }
    });
  }
}

export default Knowledge;