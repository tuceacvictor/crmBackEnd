module.exports = (sequelize, Sequelize) => {
    return sequelize.define("customer", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.INTEGER
        },
    }, {
        timestamps: false,
        tableName: 'customer'
    });
};