module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Office', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });
};