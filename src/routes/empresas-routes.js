const { Router } = require('express');
const EmpresasController = require('../controllers/empresas-controllers');

const routes = Router();

const empresasController = new EmpresasController();

routes.get('/cadastro', empresasController.mostrarCadastro);

routes.post('/cadastrar', empresasController.cadastrar);

routes.get('/:empresa_id', empresasController.mostrarMembrosDaEmpresa);

module.exports = routes; 