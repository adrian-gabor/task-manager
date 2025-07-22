const  jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


function isAuthenticated(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Brak tokenu autoryzacyjnego.' });
    }

    const token = authHeader.split(' ')[1]; // "Bearer TOKEN"
    if (!token) {
        return res.status(401).json({ error: 'Błędny format tokenu.' });
    }
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
        return res.status(403).json({ error: 'Token jest nieprawidłowy lub wygasł.' });
        }
        req.user = decoded.id;
        next();
    });
    }

    module.exports = isAuthenticated;