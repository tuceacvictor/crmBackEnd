const auth = require('../../middleware/auth.middleware');
const router = require("express").Router();
const type = require("../../controllers/device/type.controller.js");

module.exports = app => {
    router.post('/create', auth, type.create);

    router.get('/', auth, type.getAll);

    router.put('/update', auth, type.update);

    router.delete('/', auth, type.delete);

    router.post('/read', auth, type.read);

    app.use('/api/device_type', router);
};
