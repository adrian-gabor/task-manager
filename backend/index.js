const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const app = express();
const port = 3001;

app.use(express.json());
app.use(logger);
app.use(cors());
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes); 




function logger(req, res, next) {
  console.log(req.originalUrl)
  next()
}


app.listen(port, () => {
  console.log(`Server działa na http://localhost:${port}`);
});