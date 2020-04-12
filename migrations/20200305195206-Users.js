'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn(
                'users',
                'primaryColor',
                Sequelize.STRING
            ),
            queryInterface.addColumn(
                'users',
                'secondaryColor',
                Sequelize.STRING
            ),
            queryInterface.addColumn(
                'users',
                'nightLight',
                Sequelize.BOOLEAN
            ),
            queryInterface.addColumn(
                'users',
                'office',
                Sequelize.ABSTRACT
            )
        ]);

        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.createTable('users', { id: Sequelize.INTEGER });
        */
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.

          Example:
          return queryInterface.dropTable('users');
        */
    }
};
