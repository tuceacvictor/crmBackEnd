module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("Order", {
        id: {
            type: Sequelize.INT
        },
        user_begin_id: {
            type: Sequelize.INT
        },
        user_end_id: {
            type: Sequelize.INT
        },
        date_begin: {
            type: Sequelize.DATETIME
        },
        date_end:{
            type: Sequelize.DATETIME
        },
        serial:{
            type: Sequelize.VARCHAR
        },
        client_id:{
            type: Sequelize.INT
        },
        model_id:{
            type: Sequelize.INT
        },
        description:{
            type: Sequelize.VARCHAR
        },
        master_id:{
            type: Sequelize.INT
        },
        status:{
            type: Sequelize.INT
        },
        cost:{
            type: Sequelize.DOUBLE
        },
        detail_cost:{
            type: Sequelize.FLOAT
        },
        sell:{
            type: Sequelize.INT
        },
        office_id:{
            type: Sequelize.INT
        },
        office_begin_id:{
            type: Sequelize.INT
        },
        office_end_id:{
            type: Sequelize.INT
        },
        replace_status:{
            type: Sequelize.INT
        },
        replace_to:{
            type: Sequelize.INT
        },
        callsms:{
            type: Sequelize.INT
        },
        device_type_id:{
            type: Sequelize.INT
        },
        device_brand_id:{
            type: Sequelize.INT
        },
        device_name_id:{
            type: Sequelize.INT
        },
        where_type:{
            type: Sequelize.INT
        },
        called:{
            type: Sequelize.INT
        },
        franchise:{
            type: Sequelize.FLOAT
        },
        detail_sell:{
            type: Sequelize.FLOAT
        },
        bank_transfer:{
            type: Sequelize.FLOAT
        },

    });

    return Order;
};