const express = require('express');
const controller = require('../controllers/produtoController');

const router = express.Router();

router.post('/', controller.criar);
router.get('/', controller.listarTodos);
router.get('/codigo/:codigo', controller.buscarPorCodigo);
router.get('/categoria/:categoria', controller.buscarPorCategoria);
router.put('/:codigo', controller.atualizar);
router.patch('/:codigo', controller.atualizar);
router.delete('/:codigo', controller.deletar);

module.exports = router;
