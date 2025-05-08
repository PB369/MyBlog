const jwt = require('jsonwebtoken');
const bcriptjs = require('bcryptjs');
const db = require('../db');

export const login = async ({req, res}) => {
    try {
        const { username, password } = req.body;
    
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    
        const user = result.rows[0];
        const passwordMatch = bcriptjs.compareSync(user.password, password);
    
        if(!user || !passwordMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
        const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET, { expiresIn: '3h' });
    
        res.json({ token });
    } catch {
        console.error('Something went wrong with the user login', error);
        res.status(500).json({ message: 'Server error' });
    }
}