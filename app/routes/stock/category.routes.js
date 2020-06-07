const auth = require('../../middleware/auth.middleware');
const router = require("express").Router();
const category = require("../../controllers/stock/category.controller.js");

module.exports = app => {
    router.post('/create', auth, category.create);

    router.get('/', auth, category.getAll);

    router.put('/update', auth, category.update);

    router.delete('/', auth, category.delete);

    router.post('/read', auth, category.read);

    app.use('/api/category', router);
};
