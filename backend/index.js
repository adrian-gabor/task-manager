const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json());
app.use(logger);
app.use(cors());


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Błąd' });
  }
});


app.post('/tasks', async (req, res) => {
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
    console.error('Błąd przy dodawaniu zadania:', err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});



app.put('/tasks/:id', async (req, res) => {
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
    res.status(500).json({ error: 'Błąd serwera' });
  }
})


app.delete('/tasks/:id', async (req, res) => {
  const taskId = Number(req.params.id);
  if (!taskId) {
    return res.status(400).json({ error: 'Brak Id' });
  }
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [taskId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Zadanie nie znalezione' });
    }
    res.status(200).json({ deleted: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
})


function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}


app.listen(port, () => {
  console.log(`Server działa na http://localhost:${port}`);
});