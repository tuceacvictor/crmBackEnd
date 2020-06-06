module.exports = (sequelize, Sequelize) => {
    return sequelize.define("Order", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true
            },
            user_begin_id: {
                type: Sequelize.INTEGER
            },
            user_end_id: {
                type: Sequelize.INTEGER
            },
            date_begin: {
                type: Sequelize.DATE
            },
            date_end: {
                type: Sequelize.DATE
            },
            serial: {
                type: Sequelize.STRING
            },
            model_id: {
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.STRING
            },
            master_id: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.INTEGER
            },
            cost: {
                type: Sequelize.DOUBLE
            },
            detail_cost: {
                type: Sequelize.FLOAT
            },
            sell: {
                type: Sequelize.INTEGER
            },
            office_id: {
                type: Sequelize.INTEGER
            },
            office_begin_id: {
                type: Sequelize.INTEGER
            },
            office_end_id: {
                type: Sequelize.INTEGER
            },
            replace_status: {
                type: Sequelize.INTEGER
            },
            replace_to: {
                type: Sequelize.INTEGER
            },
            callsms: {
                type: Sequelize.INTEGER
            },
            client_id: {
                type: Sequelize.INTEGER
            },
            device_type_id: {
                type: Sequelize.INTEGER
            },
            device_brand_id: {
                type: Sequelize.INTEGER
            },
            device_name_id: {
                type: Sequelize.INTEGER
            },
            where_type: {
                type: Sequelize.INTEGER
            },
            called: {
                type: Sequelize.INTEGER
            },
            franchise: {
                type: Sequelize.FLOAT
            },
            detail_sell: {
                type: Sequelize.FLOAT
            },
            bank_transfer: {
                type: Sequelize.FLOAT
            }
        },
        {
            timestamps: false,
            tableName: 'order'
        });
};