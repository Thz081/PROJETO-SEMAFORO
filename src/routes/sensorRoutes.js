const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

router.post('/dados-sensor', sensorController.salvarDadosSensor);
router.get('/ultimo-dado', sensorController.buscarUltimoDado);

module.exports = router;