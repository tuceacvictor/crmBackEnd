module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Executor', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,
        tableName: 'executor'
    });
};