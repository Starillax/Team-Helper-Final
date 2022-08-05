const { dbcon } = require("../config/connection-db");

class Empresa {
    constructor(id, nome) {
        this.id = id;
        this.nome = nome;
    }
}

// DAO = DATA ACCESS OBJECT
class EmpresaDAO {

    static async cadastrarEmpresa(empresa) {

        const sql = 'INSERT INTO empresa (nome) VALUES ($1);';
        const values = [empresa.nome];

        try {
            await dbcon.query(sql, values);
            console.log('CADASTRO DE EMPRESA BEM-SUCEDIDO!');
        } catch (error) {
            console.log('NÃO FOI POSSÍVEL CADASTRAR O EMPRESA');
            console.log({ error });
        }
        
    }

    static async encontrarEmpresas() {

        const sql = 'SELECT * FROM empresa;';

        const result = await dbcon.query(sql);
        const empresas = result.rows;

        return empresas;

    }

    static async encontrarNomeDaEmpresa(empresa_id) {

        const sql = 'SELECT nome FROM empresa where id = $1;';

        const result = await dbcon.query(sql, [empresa_id]);
        const empresa = result.rows[0];

        return empresa;

    }

    static async encontrarMembrosDaEmpresa(empresa_id) {

        const sql = 'SELECT * FROM usuario where empresa = $1;';

        const result = await dbcon.query(sql, [empresa_id]);
        const usuarios = result.rows;

        return usuarios;

    }

}

module.exports = {
    Empresa,
    EmpresaDAO
};