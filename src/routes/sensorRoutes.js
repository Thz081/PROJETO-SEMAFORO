const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');
const checarAutenticacao = require('../middlewares/authMiddleware');

router.post('/dados-sensor', sensorController.salvarDados);
router.get('/status-atual', sensorController.buscarStatusAtual);
router.get('/historico/sala/:salaId', checarAutenticacao, sensorController.buscarHistoricoSala);
router.get('/analise/sala/:salaId', checarAutenticacao, sensorController.gerarAnaliseSala);

module.exports = router;