const auth = require('../middleware/auth.middleware');
const roleAccess = require('../middleware/role.middleware');
const router = require("express").Router();
const role = require("../controllers/role.controller.js");

module.exports = app => {
    router.post('/create', auth, role.create);

    router.get('/', auth, roleAccess, role.getAll);

    router.put('/update', auth, role.update);

    router.delete('/', auth, role.delete);

    router.post('/read', auth, role.read);


    app.use('/api/role', router);
};
