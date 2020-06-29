module.exports = (sequelize, Sequelize) => {
    return sequelize.define('DeviceType', {
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
        tableName: 'device_type'
    });
};