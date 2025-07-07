const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const JWT_SECRET = process.env.JWT_SECRET || 'tajny_klucz';


router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Brak pola email lub hasło' });
    }
    try {
        const hashed = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, ($2)) RETURNING id, email',
            [email, hashed]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        return res.status(500).json({ error: 'Błąd serwera' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Brak pola email lub hasło' });
    }
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user) return res.status(401).json({ error: 'Niepoprawny dane logowania' });
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Nieprawidłowe dane logowania' });
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        return res.status(500).json({ error: 'Błąd serwera' });
    }
});

module.exports = router;