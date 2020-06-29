module.exports = (sequelize, Sequelize) => {
    return sequelize.define('DeviceBrand', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: true,
        tableName: 'device_brand'
    });
};