const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.office = require("./office.model")(sequelize, Sequelize);
db.customer = require("./customer.model")(sequelize, Sequelize);
db.order = require("./order.model")(sequelize, Sequelize);
db.stock = require("./stock/stock.model")(sequelize, Sequelize);
db.defectStock = require("./stock/defectStock.model")(sequelize, Sequelize);
db.category = require("./stock/category.model")(sequelize, Sequelize);
module.exports = db;