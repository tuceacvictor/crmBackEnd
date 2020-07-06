module.exports = (sequelize, Sequelize) => {
    const {executor, user, Device, customer} = sequelize.models;
    console.log(sequelize);

    const order = sequelize.define("Order", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            client_id: {
                type: Sequelize.INTEGER
            },
            device_id: {
                type: Sequelize.INTEGER
            },
            manager_id: {
                type: Sequelize.INTEGER
            },
            executor_id: {
                type: Sequelize.INTEGER
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

    //executor.hasOne(order);
    //order.belongsTo(executor);

    //client.hasOne(order);
    //order.belongsTo(client);

    return order;
};