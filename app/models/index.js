const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const utils = require('../../app/utils/initializeApp');
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

//user
const userModel = require("./user.model")(sequelize, Sequelize);
db.user = userModel.user;
db.role = userModel.role;
db.office = userModel.office;


db.order = require("./order.model")(sequelize, Sequelize);

//customer
const customerModel = require("./customer.model")(sequelize, Sequelize);
db.whereKnown = customerModel.whereKnown;
db.customer = customerModel.customer;

//stock
const stockModel = require("./stock/stock.model")(sequelize, Sequelize);
db.category = stockModel.category;
db.stock = stockModel.stock;
db.defectStock = require("./stock/defectStock.model")(sequelize, Sequelize);

//device
const deviceModel = require("./device/device.model")(sequelize, Sequelize);
db.device_brand = deviceModel.brand;
db.device_model = deviceModel.model;
db.device_type = deviceModel.type;
db.device = deviceModel.device;


utils.initializeApp(db.user, db.role);

module.exports = db;