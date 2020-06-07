const auth = require('../middleware/auth.middleware');
const router = require("express").Router();
const whereKnown = require("../controllers/whereKnown.controller.js");

module.exports = app => {
    router.post('/create', auth, whereKnown.create);

    router.get('/', auth, whereKnown.getAll);

    router.put('/update', auth, whereKnown.update);

    router.delete('/', auth, whereKnown.delete);

    router.post('/read', auth, whereKnown.read);

    app.use('/api/whereKnown', router);
};
