const bcrypt = require('bcryptjs');
const logger = require('./logger');
exports.initializeApp = async (User, Role) => {
    try {
        if (User && Role) {
            const users = await User.findAll();
            const roles = await Role.findAll();


            //check for roles
            if (roles.length === 0) {
                const role = [
                    {name: 'admin'},
                    {name: 'manager'}
                ];
                for (const r of role) {
                    await Role.create(r)
                }
            }


            //check for users
            if (users.length === 0) {
                //create admin
                const hashedPassword = await bcrypt.hash('admin', 8);
                const user = {
                    login: 'admin',
                    password: hashedPassword,
                    email: 'tuceak16@gmail.com',
                    roleId: 1,
                    //   officeId: '0'
                };
                await User.create(user);
            }
        }


    } catch (e) {
        logger.error(`INIT APP ERR: ${e}`);
        console.log('INIT ERROR', e)
    }
};