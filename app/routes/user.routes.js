const auth = require('../middleware/auth.middleware');
const router = require("express").Router();
const users = require("../controllers/user.controller.js");

module.exports = app => {
    //login user
    router.post("/login", users.login);

    //change password
    router.post("/changePassword", auth, users.changePassword);

    // Create a new User
    router.post("/", users.create);

    // Retrieve all users
    router.get("/", auth, users.findAll);

    // Retrieve all active users
    router.get("/active", auth, users.findAllActive);

    // Retrieve a single User with id
    router.get("/:id", auth, users.findOne);

    // Update a User with id
    router.put("/:id", auth, users.update);

    // Delete a User with id
    router.delete("/:id", auth, users.delete);

    // Create a new User
    router.delete("/", auth, users.deleteAll);

    app.use('/api/users', router);
};