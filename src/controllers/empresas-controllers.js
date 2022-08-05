const { dbcon } = require('../config/connection-db');
const { Empresa, EmpresaDAO } = require('../models/empresa');

class EmpresasController {

    async mostrarCadastro(req, res) {
        return res.render('empresa_form', {user : req.session.user});
    }

    async cadastrar(req, res) {
        
        const empresaBody = {
            nome: req.body.nome
        }
        
        const empresa = new Empresa(null, empresaBody.nome);
        await EmpresaDAO.cadastrarEmpresa(empresa);

        return res.redirect('/');

    }

    async mostrarMembrosDaEmpresa(req, res) {

        const { empresa_id } = req.params;

        const result1 = await EmpresaDAO.encontrarNomeDaEmpresa(empresa_id);
        const result2 = await EmpresaDAO.encontrarMembrosDaEmpresa(empresa_id);
        
        return res.render('empresa_membros', {user: req.session.user, empresa_nome: result1, membros: result2});
    }

}

module.exports = EmpresasController;