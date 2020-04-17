const env = process.env.NODE_ENV || "development";
if (env === 'development') {
    module.exports = {
        HOST: 'localhost',
        USER: 'root',
        PASSWORD: '',
        DB: 'crm',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
} else {
    module.exports = {
        HOST: 'localhost',
        USER: 'tu4ka_crm',
        PASSWORD: 'dRxt1qEPQ8HW',
        DB: 'tu4ka_crm',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    };
}