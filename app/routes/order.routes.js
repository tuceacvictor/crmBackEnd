const auth = require('../middleware/auth.middleware');
const router = require("express").Router();
const orders = require("../controllers/orders.controller.js");

module.exports = (app) => {
    //get all
    router.get("/", auth, orders.findAll);

    //read
    router.post("/read", auth, orders.read);

    //change status
    router.put("/changeStatus", auth, orders.changeStatus);

    //create
    router.post("/create", auth, orders.createOrder);


    app.use('/api/order', router);
};