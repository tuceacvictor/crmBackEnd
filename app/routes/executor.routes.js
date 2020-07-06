const auth = require('../middleware/auth.middleware');
const router = require("express").Router();
const executor = require("../controllers/executor.controller.js");

module.exports = app => {
    router.post('/create', auth, executor.create);

    router.get('/', auth, executor.findAll);

    router.delete('/', auth, executor.delete);

    router.post('/read', auth, executor.findOne);

    router.put('/update', auth, executor.update);
    app.use('/api/executor', router);
};
