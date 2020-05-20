module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Category', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: true
    });
};