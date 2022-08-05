const { Router } = require('express');
const UsersController = require('../controllers/users-controllers');
const { upload } = require('../config/multer-config');

const routes = Router();

const usersController = new UsersController();

routes.get('/cadastro', usersController.mostrarCadastro);

routes.get('/', usersController.mostrarLogin);

routes.post('/cadastrar', upload.single('pfp'), usersController.cadastrar);

routes.post('/login', usersController.login);

routes.post('/criarReuniao', usersController.criarReuniao);

routes.get('/reuniao/:user', usersController.mostrarReuniao);

routes.get('/agenda/:user', usersController.mostrarAgendaDoUsuario);

routes.get('/logout', usersController.logout);

routes.get('/times', usersController.mostrarTimesDoUsuario);

module.exports = routes;