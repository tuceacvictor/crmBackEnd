const auth = require('../../middleware/auth.middleware');
const router = require("express").Router();
const device = require("../../controllers/device/device.controller.js");

module.exports = app => {
    router.post('/create', auth, device.create);

    router.get('/', auth, device.getAll);

    router.put('/update', auth, device.update);

    router.delete('/', auth, device.delete);

    router.post('/read', auth, device.read);

    app.use('/api/device', router);
};
