const auth = require('../../middleware/auth.middleware');
const router = require("express").Router();
const stock = require("../../controllers/stock/stock.controller.js");

module.exports = app => {
    router.post('/create', auth, stock.create);

    router.get('/', auth, stock.getAll);

    router.delete('/', auth, stock.delete);

    router.post('/read', auth, stock.read);

    router.put('/update', auth, stock.update);

    router.post('/moveToDefect', auth, stock.moveToDefect);

    app.use('/api/stock', router);
};
