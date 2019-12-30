module.exports = {
    HOST: 'localhost',
    USER: 'cq91631_crm',
    PASSWORD: 'crm123',
    DB: 'cq91631_crm',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};