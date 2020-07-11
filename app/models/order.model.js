module.exports = (sequelize, Sequelize, db) => {
    const {executor, user, device, customer} = db;
    const order = sequelize.define("Order", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            password: {
                type: Sequelize.STRING
            },
            appearance: {
                type: Sequelize.STRING
            },
            equipment: {
                type: Sequelize.STRING,
            },
            problem: {
                type: Sequelize.STRING,
            },
            estimated_price: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.STRING
            },
            ready_date: {
                type: Sequelize.DATE
            },
            prepayment: {
                type: Sequelize.INTEGER,
            },
            urgently: {
                type: Sequelize.BOOLEAN
            },
            status: {
                type: Sequelize.STRING,
                isIn: ['opened', 'closed']
            }
        },
        {
            timestamps: true,
            tableName: 'order'
        });

    executor.hasOne(order);
    order.belongsTo(executor);

    customer.hasOne(order);
    order.belongsTo(customer);

    device.hasOne(order);
    order.belongsTo(device);

    user.hasOne(order);
    order.belongsTo(user);

    return order;
};