const auth = require('../../middleware/auth.middleware');
const router = require("express").Router();
const defectStock = require("../../controllers/stock/defectStock.controller.js");

module.exports = app => {
    router.post('/create', auth, defectStock.create);

    router.get('/', auth, defectStock.getAll);

    router.delete('/', auth, defectStock.delete);

    router.post('/read', auth, defectStock.read);


    app.use('/api/defectStock', router);
};
