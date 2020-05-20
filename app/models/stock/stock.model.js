module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Stock', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        count: {
            type: Sequelize.INTEGER
        },
        office_id: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: true
    });
};