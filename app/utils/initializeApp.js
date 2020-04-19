const db = require("../models");
const bcrypt = require('bcryptjs');
const User = db.user;
const Role = db.role;

exports.initializeApp = async () => {
    try {
        const users = await User.findAll();
        const roles = await Role.findAll();
        //check for users
        if (users.length === 0) {
            //create admin
            const hashedPassword = await bcrypt.hash('admin', 8);
            const user = {
                login: 'admin',
                password: hashedPassword,
                email: 'tuceak16@gmail.com',
                role: '0',
                office: 'all'
            };
            User.create(user);
        }


        //check for roles
        if (roles.length === 0) {

        }
    } catch (e) {
        console.log(e)
    }
};