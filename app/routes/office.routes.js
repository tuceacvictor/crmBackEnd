const auth = require('../middleware/auth.middleware');
const router = require("express").Router();
const office = require("../controllers/office.controller.js");

module.exports = app => {
    router.post('/create', auth, office.create);

    router.get('/', auth, office.findAll);

    router.delete('/', auth, office.delete);

    router.post('/read', auth, office.findOne);

    router.put('/update', auth, office.update);
    app.use('/api/office', router);
};
