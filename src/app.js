const express = require('express');
const sensorRoutes = require('./routes/sensorRoutes'); // Importa nossas rotas

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/api', sensorRoutes); 

module.exports = app;