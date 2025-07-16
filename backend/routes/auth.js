const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const JWT_SECRET = process.env.JWT_SECRET || 'tajny_klucz';
const { body, validationResult } = require('express-validator');

const validateRegister = [
    body('email')
        .isEmail().withMessage('Wprowadź poprawny adres e-mail.')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 }).withMessage('Hasło musi mieć co najmniej 8 znaków.')
        .matches(/[0-9]/).withMessage('Hasło musi zawierać co najmniej jedną cyfrę.')
        .matches(/[a-z]/).withMessage('Hasło musi zawierać co najmniej jedną małą literę.'),
    body('firstname')
        .trim()
        .notEmpty().withMessage('Imię jest wymagane.')
        .isLength({ max: 30 }).withMessage('Imię nie może przekraczać 30 znaków.'),
    body('lastname')
        .trim()
        .notEmpty().withMessage('Nazwisko jest wymagane.')
        .isLength({ max: 30 }).withMessage('Nazwisko nie może przekraczać 30 znaków.')
];


router.post('/register', validateRegister, async (req, res) => {
     const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({ error: 'Brak wszystkich pól' });
    }
    try {
        const hashed = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (email, password, firstname, lastname) VALUES ($1, $2, $3, $4) RETURNING id, email, firstname, lastname',
            [email, hashed, firstname, lastname]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
});

const validateLogin = [
    body('email')
        .isEmail().withMessage('Wprowadź poprawny adres e-mail.'),
    body('password')
        .notEmpty().withMessage('Hasło jest wymagane.')
];



router.post('/login',validateLogin, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Brak pola email lub hasło' });
    }
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user) return res.status(401).json({ error: 'Niepoprawny dane logowania' });
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Niepoprawny dane logowania' });
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        next(err);
    }
});

module.exports = router;