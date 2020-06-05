

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('Stock', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },

        category_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Categories',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        },
        price: {
            type: Sequelize.INTEGER
        },
        count: {
            type: Sequelize.INTEGER
        },
        office_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'offices',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        }
    }, {
        timestamps: true
    });
};