module.exports = {
    db: {
        database: process.env.DB_NAME || 'mh-things-db',
        user: process.env.DB_USER || 'mh-things-user',
        password: process.env.DB_PASS || 'mh-things-pass',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: process.env.DIALECT || './mh-things.sqlite'
        }
    }
}