const express = require('express');
const router = express.Router();
const salaController = require('../controllers/salaController');
const checarAutenticacao = require('../middlewares/authMiddleware');

router.use(checarAutenticacao);

router.get('/', salaController.listarSalas);        
router.post('/', salaController.criarSala);          
router.get('/:id', salaController.obterSalaPorId);  
router.put('/:id', salaController.atualizarSala);
router.delete('/:id', salaController.deletarSala);

module.exports = router;