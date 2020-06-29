module.exports = (sequelize, Sequelize) => {
    const device = sequelize.define('Device', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        serial: {
            type: Sequelize.STRING
        },
        equipment: {
            type: Sequelize.STRING
        },
        appearance: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: true,
        tableName: 'device'
    });

    const model = sequelize.define('model', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false,
        tableName: 'device_model'
    });

    const brand = sequelize.define('brand', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false,
        tableName: 'device_brand'
    });


    const type = sequelize.define('type', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false,
        tableName: 'device_type'
    });

    model.hasOne(device);
    device.belongsTo(model);

    brand.hasOne(device);
    device.belongsTo(brand);
    
    type.hasOne(device);
    device.belongsTo(type);
    return {device, model, brand, type};
};