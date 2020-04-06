module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Role', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });
};