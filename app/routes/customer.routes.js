const auth = require('../middleware/auth.middleware');
const router = require("express").Router();
const customer = require("../controllers/customer.controller.js");

module.exports = (app) => {
    router.post('/create', auth, customer.create);

    router.get('/', auth, customer.getAll);

    router.put('/update', auth, customer.update);

    router.delete('/', auth, customer.delete);

    router.post('/read', auth, customer.read);

    app.use('/api/customer', router);
};