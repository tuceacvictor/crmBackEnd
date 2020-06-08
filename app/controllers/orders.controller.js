const {paginate} = require('./utils/paginate')
const db = require("../models");
const sequelize = require("sequelize");
const order = db.order;
const customer = db.customer;


exports.getOrders = async (req, res) => {
    order.hasMany(customer, {foreignKey: 'id'});
    try {
        const response = await order.findAll({
            include: [{model: customer}],
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('client_id')), 'orders_count'],
                [sequelize.col(`name`), `name`],
                [sequelize.col(`phone`), `phone`],
            ],
            group: [`phone`],

        });
        res.send(response)
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message || 'Что-то пошло не так, попробуйте снова'})
    }
};