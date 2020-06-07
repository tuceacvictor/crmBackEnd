const bcrypt = require('bcryptjs');

exports.initializeApp = async (User, Role) => {
    try {
        console.log(User, Role)
        if(User && Role){
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
                    role: 'admin',
                    office: 'all'
                };
                User.create(user);
            }


            //check for roles
            if (roles.length === 0) {
                const role = {
                    name: 'admin'
                };
                Role.create(role)
            }
        }

    } catch (e) {
        console.log('INIT ERROR', e)
    }
};