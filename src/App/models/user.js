import { Model, DataTypes } from 'sequelize';

class User extends Model {
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
      },
      email: {
         type: DataTypes.STRING(100),
         allowNull: false,
      },
      password: {
         type: DataTypes.STRING(255),
         allowNull: false,
         unique: true,
      },
      level: {
         type: DataTypes.STRING(30),
         allowNull: false,
      },
      description: {
         type: DataTypes.TEXT,
         allowNull: true,
      },
    },
    {
      sequelize,
      name: {
        singular: 'user',
        plural: 'users',
      }
    });
  }
}

export default User;