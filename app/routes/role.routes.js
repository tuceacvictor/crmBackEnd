const auth = require('../middleware/auth.middleware');
const roleAccess = require('../middleware/role.middleware');
const router = require("express").Router();
const role = require("../controllers/role.controller.js");

module.exports = app => {
    router.post('/create', auth, role.create);

    router.get('/', auth, roleAccess, role.findAll);


    app.use('/api/role', router);
};
