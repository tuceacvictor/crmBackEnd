module.exports = (sequelize, Sequelize) => {
  return sequelize.define("User", {
      login: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      role: {
        type: Sequelize.STRING,
      },
      office: {
        type: Sequelize.STRING
      },
      defaultOffice: {
        type: Sequelize.STRING
      },
      primaryColor: {
        type: Sequelize.STRING
      },
      secondaryColor: {
        type: Sequelize.STRING
      },
      nightLight: {
        type: Sequelize.BOOLEAN
      }
    }, {
      tableName: 'user'
  });
  };