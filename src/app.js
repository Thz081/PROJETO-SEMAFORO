const express = require('express');
const session = require('express-session');
const sensorRoutes = require('./routes/sensorRoutes');
const authRoutes = require('./routes/authRoutes'); 

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: 'o-segredo-do-semaforo-sensorial-que-ninguem-sabe',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use('/api', sensorRoutes);
app.use('/api/auth', authRoutes); 

module.exports = app;