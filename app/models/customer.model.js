module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("Customer", {
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
        timestamps: false
    });
    return Customer;
};