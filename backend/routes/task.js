const express = require('express');
const router = express.Router();
const pool = require('../db');


router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});


router.post('/', async (req, res, next) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Brak pola text' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO tasks (text) VALUES ($1) RETURNING *',
      [text]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});



router.put('/:id', async (req, res, next) => {
  const taskId = Number(req.params.id);
  if (!taskId) {
    return res.status(400).json({ error: 'Brak Id' });
  }
  try {
    const check = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);
    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'Zadanie nie znalezione' });
    }
    const currentDone = check.rows[0].done;
    const result = await pool.query(
      'UPDATE tasks SET done = $1 WHERE id = $2 RETURNING *',
      [!currentDone, taskId]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
})


router.delete('/:id', async (req, res, next) => {
  const taskId = Number(req.params.id);
  if (!taskId) {
     throw new BadRequestError('ID zadania musi być liczbą.');
  }
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [taskId]);
    if (result.rows.length === 0) {
      throw new NotFoundError('Zadanie o podanym ID nie istnieje.');
    }
    res.status(200).json({ deleted: result.rows[0] });
  } catch (err) {
    next(err);
  }
})


module.exports = router;