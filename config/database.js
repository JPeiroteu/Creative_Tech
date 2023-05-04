const mysql = require("mysql2/promise");
/*
const pool = mysql.createPool({
    host: "db4free.net",
    user: "jpeiro",
    password: "123peyroteo321",
    database: "creative_tech",
    connectionLimit: 20
});
*/

/*
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "db4free.net",
    user: "jpeiro",
    password: "123peyroteo321",
    database: "creative_tech",
    connectionLimit: 20
});

module.exports = pool;


/*
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 20
});


module.exports = pool;