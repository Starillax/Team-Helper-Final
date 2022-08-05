const bcrypt = require('bcrypt');
const { dbcon } = require('../config/connection-db');
const { Usuario, UsuarioDAO } = require('../models/user');
const { EmpresaDAO } = require('../models/empresa');

class UsersController {

    async mostrarCadastro(req, res) {

        const result = await EmpresaDAO.encontrarEmpresas();

        return res.render('user_form', {user : undefined, empresas : result});
    }

    async mostrarReuniao(req, res) {
        const email = req.params.user;

        const result1 = await UsuarioDAO.encontrarTimesAdmin(email);
        const result2 = await UsuarioDAO.encontrarTimesMembro(email);

        return res.render('reuniao_form', {user : req.session.user, admin_times: result1, membro_times: result2});
    }

    async mostrarAgendaDoUsuario(req, res) {
        const agenda = await UsuarioDAO.agendaUsuario(req.params.user);
        
        return res.render('minha_agenda', {user:req.session.user, agenda:agenda});
    }

    async cadastrar(req, res) {

        console.log(req.file.filename);
        const userBody = req.body;
        const senha = bcrypt.hashSync(userBody.senha, 10); 
        
        if (req.file !== undefined) {

            const user = {
                email: userBody.email,
                nome: userBody.nome,
                senha: senha,
                pfp: req.file.filename,
                empresa: userBody.empresa
            }

            const usuario = new Usuario(user.email, user.nome, user.senha, user.pfp, user.empresa);
            await UsuarioDAO.cadastrarUsuario(usuario);
            const userSession = {
                email: user.email,
                nome: user.nome,
                pfp: user.pfp,
                empresa: user.empresa
            }
            
            req.session.user = userSession;
            return res.redirect('/pagIni');

        } else {

            const user = {
                email: userBody.email,
                nome: userBody.nome,
                senha: senha,
                pfp: 'avatar.png',
                empresa: userBody.empresa
            }

            const usuario = new Usuario(user.email, user.nome, user.senha, user.pfp, user.empresa);
            await UsuarioDAO.cadastrarUsuario(usuario);
            const userSession = {
                email: user.email,
                nome: user.nome,
                pfp: user.pfp,
                empresa: user.empresa
            }
            
            req.session.user = userSession;
            return res.redirect('/pagIni');
        }

    }

    async mostrarLogin(req, res) {
        return res.render('user_login', {user : undefined});
    }

    async login(req, res) {

        const { email, senha } = req.body;

        const usuario = await UsuarioDAO.encontrarUsuario(email);

        if (usuario === undefined) {
            return res.send('Usuário não está cadastrado ao sistema <br><br> <a href="/">Voltar à página inicial</a>');
        }

        const confere = bcrypt.compareSync(senha, usuario.senha);
        if (confere) {
            const userSession = {
                email: usuario.email,
                nome: usuario.nome,
                pfp: usuario.pfp,
                empresa: usuario.empresa
            }

            req.session.user = userSession;
            return res.redirect('/pagIni');
        } else {
            return res.send('Senha incorreta... <br><br> <a href="/">Voltar à página inicial</a>');
        }
        
    }

    async criarReuniao(req, res) {

        const dataHora = `${req.body.data} ${req.body.hora}`;
        const time = req.body.time;
        const email = req.session.user.email;

        await UsuarioDAO.insereReuniao(time, dataHora, email);

        return res.redirect('/pagIni');

    }

    async logout(req, res) {

        req.session.destroy();

        return res.redirect('/');
    }

    async mostrarTimesDoUsuario(req, res) {

        const email = req.session.user.email;

        const result1 = await UsuarioDAO.encontrarTimesAdmin(email);
        const result2 = await UsuarioDAO.encontrarTimesMembro(email);
        const result3 = await UsuarioDAO.encontrarConvites(email);

        return res.render('user_times', {user : req.session.user, admin_times: result1, membro_times: result2, convites: result3});
    }

}

module.exports = UsersController;