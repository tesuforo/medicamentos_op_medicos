module.exports = {
    database: {
        connectionLimit: 10,
        host: process.env.DATABASE_HOST || 'localhost',
        user: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || '89javier',
    database: process.env.DATABASE_NAME || 'DBLINK'
    },
    port: process.env.PORT || 5005
};