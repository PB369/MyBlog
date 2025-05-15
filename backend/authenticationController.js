const { getManager } = require('./managerModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET= process.env.JWT_SECRET;

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getManager(username);
        console.log("User: ", user);
        if(!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        console.log("Credentiais compatíveis");
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '2h' });
        console.log("Token: ", token);
        res.json({ token });
    } catch (err) {
        console.log("ErroErro", err);
        res.status(500).json({ error: "Login couldn't be done" });
    }
}

module.exports = register;