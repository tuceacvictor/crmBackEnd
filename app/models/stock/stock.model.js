

module.exports = (sequelize, Sequelize) => {
    const stock = sequelize.define('stock', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
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
                model: 'office',
                key: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade',
        }
    }, {
        timestamps: true,
        tableName: "stock"
    });


    const category = sequelize.define('category', {
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
        tableName: 'stock_category'
    });

    category.hasOne(stock);
    stock.belongsTo(category);

    return { stock, category };
};