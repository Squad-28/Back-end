import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    super.init({
      /* initials: {

      } */
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      level: Sequelize.STRING,
      description: Sequelize.STRING
    },
    {
      sequelize,
      name: {
        singular: 'user',
        plural: 'users',
      }
    });
  }

  static associations(models) {

  }
}

export default User;