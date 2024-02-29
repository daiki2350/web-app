const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    database: 'users',
    port: 5432,
    user: 'daiki',
    password: 'daiki410',
    ssl: { 
        sslmode: 'require',
        rejectUnauthorized: false
    }    
});
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = pool;