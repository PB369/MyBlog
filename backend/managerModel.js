require('dotenv').config();
const pool = require('./db');

export const getManager = async (username) => {
    const res = await pool.query('SELECT * FROM managers WHERE username = $1', [username]);
    return res.rows[0];
}