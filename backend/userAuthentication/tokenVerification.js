const jwt = require('jsonwebtoken');

export const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    if(!token) return res.status(401).json({ message: 'Token is missing.' });

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if(error) return res.status(401).json({ message: 'The token has expired or it is invalid.' });

        req.user = user;
        next();
    })
}