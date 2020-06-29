const auth = require('../../middleware/auth.middleware');
const router = require("express").Router();
const model = require("../../controllers/device/model.controller.js");

module.exports = app => {
    router.post('/create', auth, model.create);

    router.get('/', auth, model.getAll);

    router.put('/update', auth, model.update);

    router.delete('/', auth, model.delete);

    router.post('/read', auth, model.read);

    app.use('/api/device_model', router);
};
