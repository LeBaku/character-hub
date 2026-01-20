const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

const router = express.Router();
const SALT_ROUNDS = 10;

router.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (!email ||!password) {
        return res.status(400).json({ message: 'Email et mot de passe requis' });
    }

    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });

        const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
        stmt.run(email, hash, function(err) {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    return res.status(400).json({ message: 'Email déjà utilisé' });
                }
                return res.status(500).json({ message: 'Erreur base de données' });
            }

            const token = jwt.sign({ id: this.lastID }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Email et mot de passe requis' });

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err) return res.status(500).json({ message: 'Erreur serveur' });
        if (!user) return res.status(400).json({ message: 'Mot de passe incorrect' });

        bcrypt.compare(password, user.password, (err, match) => {
            if (err) return res.status(500).json({ message: 'Erreur serveur' });
            if (!match) return res.status(400).json({ message: 'Mot de passe incorrect' });

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    });
});

module.exports = router;