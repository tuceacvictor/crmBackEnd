const db = require("../models");
const sequelize = require("sequelize");
const Order = db.order;
const Customer = db.customer;


exports.getOrders = async (req, res) => {
    Order.hasMany(Customer,{foreignKey: 'id'});
    let _q = Order;
    try {
        const Order = await _q.findAll({
            include: [{model: Customer}],
            attributes: [
                [sequelize.fn('COUNT', sequelize.col('client_id')), 'orders_count'],
                [sequelize.col('customers.name'), 'name'],
                [sequelize.col('customers.phone'), 'phone'],
            ],
            group: ['client_id'],

        });
        res.send(Order)
    } catch (e) {
        res.status(500).json({message: e.message || 'Что-то пошло не так, попробуйте снова'})
    }
};