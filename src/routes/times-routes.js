const { Router } = require('express');
const TimesController = require('../controllers/times-controllers');

const routes = Router();

const timesController = new TimesController();

routes.get('/cadastro', timesController.mostrarCadastro);

routes.post('/cadastrar', timesController.cadastrar);

routes.post('/inviteMembro/:time_id', timesController.convidarMembro);

routes.get('/entrarTime/:time_id', timesController.entrarNoTime);

routes.get('/recusarConvite/:time_id', timesController.recusarConviteParaTime);

module.exports = routes; 