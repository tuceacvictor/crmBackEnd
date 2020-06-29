const bcrypt = require('bcryptjs');

exports.initializeApp = async (User, Role) => {
    try {
        if (User && Role) {
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
                    roleId: '1',
                    //   officeId: '0'
                };
                User.create(user);
            }


            //check for roles
            if (roles.length === 0) {
                const role = [
                    {name: 'admin'},
                    {name: 'manager'}
                ];
                role.forEach(r => {
                    Role.create(r)
                })

            }
        }

    } catch (e) {
        console.log('INIT ERROR', e)
    }
};