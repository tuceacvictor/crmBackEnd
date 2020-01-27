const auth = require('../middleware/auth.middleware');
const router = require("express").Router();
const orders = require("../controllers/orders.controller.js");

module.exports = (app) => {
    //get all orders
    router.get("/", auth, orders.getOrders);

    app.use('/api/orders', router);
};