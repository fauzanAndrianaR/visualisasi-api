const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.DB_CA.replace(/\\n/g, '\n'),   // Pindahkan sertifikat ke file ENV
  },
});

pool.connect()
  .then(() => console.log("Connected to PostgreSQL database!"))
  .catch(err => console.error("Connection error", err.stack));

module.exports = pool;
