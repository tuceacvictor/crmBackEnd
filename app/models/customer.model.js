module.exports = (sequelize, Sequelize) => {
    const customer = sequelize.define("customer", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            notNull: true,
        },
        phone: {
            type: Sequelize.STRING,
            notNull: true,
        },
    }, {
        timestamps: true,
        tableName: 'customer'
    });

    const whereKnown = sequelize.define("whereKnown", {
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


    whereKnown.hasOne(customer);
    customer.belongsTo(whereKnown);
    
    return {customer, whereKnown};
};