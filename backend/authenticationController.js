import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getManager } from './managerModel';

const JWT_SECRET= process.env.JWT_SECRET;

export const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getManager(username);
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user }, JWT_SECRET, { expiresIn: '2h' });
        res.json({ token });
    } catch {
        res.status(500).json({ error: "Login couldn't be done" });
    }
}