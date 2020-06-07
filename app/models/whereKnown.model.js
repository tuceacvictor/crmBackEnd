module.exports = (sequelize, Sequelize) => {
    return sequelize.define("whereKnown", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            notNull: true
        },
    }, {
        timestamps: false,
        tableName: 'whereKnown'
    });
};