module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
        login: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        active: {
            type: Sequelize.BOOLEAN
        },
        defaultOffice: {
            type: Sequelize.STRING
        },
        primaryColor: {
            type: Sequelize.STRING
        },
        secondaryColor: {
            type: Sequelize.STRING
        },
        nightLight: {
            type: Sequelize.BOOLEAN
        }
    }, {
        timestamps: true,
        tableName: 'user'
    });

    const role = sequelize.define('role', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,
        tableName: 'role'
    });

    const office = sequelize.define('office', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,
        tableName: 'office'
    });

    role.hasOne(user);
    user.belongsTo(role);


    office.belongsToMany(user, {as: 'users', through: 'user_offices', foreignKey: 'office_id'});
    user.belongsToMany(office, {as: 'offices', through: 'user_offices', foreignKey: 'user_id'});


    return {user, role, office}
};