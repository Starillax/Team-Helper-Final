const { dbcon } = require('../config/connection-db');
const { Time, TimeDAO } = require('../models/time');
const { UsuarioDAO } = require('../models/user');

class TimesController {

    async mostrarCadastro(req, res) {
        const email = req.session.user.email;

        const result = await UsuarioDAO.encontrarEmpresaDoUsuario(email);

        return res.render('time_form', {user : req.session.user, empresa : result});
    }

    async cadastrar(req, res) {

        console.log(req.body);
        
        const timeBody = {
            nome: req.body.nome,
            admin: req.session.user.email,
            empresa: req.body.empresa
        }
        
        const time = new Time(null, timeBody.nome, timeBody.admin, timeBody.empresa);
        await TimeDAO.cadastrarTime(time);

        return res.redirect('/pagIni');

    }

    async convidarMembro(req, res) {
        
        const { time_id } = req.params;
        const user_email = req.body.email;

        const result = await TimeDAO.encontrarMembroTime(time_id, user_email);

        if (result == '') {

            await TimeDAO.criarConvite(time_id, user_email);

            return res.redirect('/pagIni');

        } else {
            return res.send('Este usuário já está cadastrado ao time <br><br> <a href="/pagIni">Voltar à página inicial</a>');
        }

    }

    async entrarNoTime(req, res) {
        
        const { time_id } = req.params;
        const user_email = req.session.user.email;
        
        await TimeDAO.cadastrarUsuarioNoTime(time_id, user_email);

        return res.redirect('/pagIni');

    }

    async recusarConviteParaTime(req, res) {
        
        const { time_id } = req.params;
        const user_email = req.session.user.email;
        
        await TimeDAO.deletarConvite(time_id, user_email);

        return res.redirect('/pagIni');

    }

}

module.exports = TimesController;