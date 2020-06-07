module.exports = (sequelize, Sequelize) => {
    return sequelize.define("customer", {
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
        whereKnown_id: {
            type: Sequelize.INTEGER,
            notNull: true,
            references: {
                model: 'whereKnown',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
    }, {
        timestamps: true,
        tableName: 'customer'
    });
};