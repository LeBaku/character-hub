const express = require('express');
const db = require('../db/database');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

router.use(authenticateToken);

// Liste des persos
router.get('/', (req, res) => {
    const userId = req.user.id;

    db.all(
        'SELECT * FROM characters WHERE user_id = ?',
        [userId],
        (err, rows) => {
            if (err) return res.status(500).json({ message: 'Erreur serveur'});
            res.json(rows);
        }
    );
});

// Création de perso
router.post('/', (req, res) => {
    const userId = req.user.id;
    const { name, race, class: characterClass, level } = req.body;

    if (!name || !race || !characterClass || level == null) {
        return res.status(400).json({ message: 'Champs manquants' });
    }

    const query = `
        INSERT INTO characters (user_id, name, race, class, level)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(
        query,
        [userId, name, race, characterClass, level],
        function (err) {
            if (err) return res.status(500).json({ message: 'Erreur serveur' });

            res.status(201).json({
                id: this.lastID,
                name,
                race,
                class: characterClass,
                level
            });
        }
    );
});

// Modif un perso
router.put('/:id', (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const { name, race, class: characterClass, level } = req.body;

    const query = `
        UPDATE characters
        SET name = ?, race = ?, class = ?, level = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND user_id = ?
    `;

    db.run(
        query,
        [name, race, characterClass, level, id, userId],
        function (err) {
            if (err) return res.status(500).json({ message: 'Erreur serveur' });
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Personnage introuvable' });
            }
            res.json({ message: 'Personnage mis à jour' });
        }
    );
});

// Supprimer un perso
router.delete('/:id', (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    db.run(
        'DELETE FROM characters WHERE id = ? AND user_id = ?',
        [id, userId],
        function (err) {
            if (err) return res.status(500).json({ message: 'Erreur serveur' });
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Personnage introuvable' });
            }
            res.json({ message: 'Personnage supprimé' });
        }
    );
});

module.exports = router;