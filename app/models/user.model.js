module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
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
      }
    });
  
    return User;
  };