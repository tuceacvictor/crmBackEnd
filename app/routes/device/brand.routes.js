const auth = require('../../middleware/auth.middleware');
const router = require("express").Router();
const brand = require("../../controllers/device/brand.controller");

module.exports = app => {
    router.post('/create', auth, brand.create);

    router.get('/', auth, brand.getAll);

    router.put('/update', auth, brand.update);

    router.delete('/', auth, brand.delete);

    router.post('/read', auth, brand.read);

    app.use('/api/device_brand', router);
};
