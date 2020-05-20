module.exports = (sequelize, Sequelize) => {
    return sequelize.define('DefectStock', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        count: {
            type: Sequelize.INTEGER
        },
        office_id: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: true
    });
};