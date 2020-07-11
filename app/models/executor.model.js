module.exports = (sequelize, Sequelize) => {
    return sequelize.define('executor', {
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