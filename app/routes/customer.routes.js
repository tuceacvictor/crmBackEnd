const auth = require('../middleware/auth.middleware');
const router = require("express").Router();
const customers = require("../controllers/customer.controller.js");

module.exports = (app) => {

    //get all customers
    router.get("/", auth, customers.getCustomers);

    app.use('/api/customers', router);
};