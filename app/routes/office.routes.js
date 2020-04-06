const auth = require('../middleware/auth.middleware');
const router = require("express").Router();
const office = require("../controllers/office.controller.js");

module.exports = app => {
    router.post('/create', auth, office.create);

    router.get('/', auth, office.findAll);

    router.delete('/:id', auth, office.delete);

    router.post('/:id', auth, office.findOne);

    app.use('/api/office', router);
};
