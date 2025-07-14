const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const port = 3001;
const isAuthenticated = require('./middleware/isAuthenticated');


app.use(express.json());
app.use(logger);
app.use(cors());
app.use('/auth', authRoutes);
app.use('/tasks', isAuthenticated, taskRoutes); 
app.use(errorHandler);




function logger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const method = req.method;
    const url = req.originalUrl;
    const status = res.statusCode;


    console.log(`[${new Date().toISOString()}] ${method} ${url} - ${status} (${duration}ms)`);
  });
  next();
}


app.listen(port, () => {
  console.log(`Server działa na http://localhost:${port}`);
});