const { dbcon } = require("../config/connection-db");

class Usuario {
    constructor(email, nome, senha, pfp, empresa) {
        this.email = email;
        this.nome = nome;
        this.senha = senha;
        this.pfp = pfp;
        this.empresa = empresa;
    }
}

// DAO = DATA ACCESS OBJECT
class UsuarioDAO {

    static async cadastrarUsuario(usuario) {

        const sql = 'INSERT INTO usuario (email, nome, senha, pfp, empresa) VALUES ($1, $2, $3, $4, $5);';
        const values = [usuario.email, usuario.nome, usuario.senha, usuario.pfp, usuario.empresa];

        console.log(values);
        
        try {
            await dbcon.query(sql, values);
            console.log('CADASTRO DE USUÁRIO BEM-SUCEDIDO!');
        } catch (error) {
            console.log('NÃO FOI POSSÍVEL CADASTRAR O USUÁRIO');
            console.log({ error });
        }
    }

    static async agendaUsuario(email) {

        const sql = "SELECT distinct(reuniao.id) as reuniao, reuniao.datahora, time.nome, reuniao.criador FROM reuniao JOIN time on time.id = reuniao.time LEFT JOIN timeusuario on time.id = timeusuario.time WHERE time.admin = $1 or timeusuario.usuario = $1;";

        const result = await dbcon.query(sql, [email]);

        return result.rows;
    }

    static async insereReuniao(time, dataHora, email) {

        const sql = "insert into reuniao (time, datahora, criador) values ($1, $2, $3)";
        const values = [time, dataHora, email];

        try {
            await dbcon.query(sql, values);
            console.log('CADASTRO DE REUNIÃO BEM-SUCEDIDO!');
        } catch (error) {
            console.log('NÃO FOI POSSÍVEL CADASTRAR A REUNIÃO');
            console.log({ error });
        }

    }

    static async encontrarUsuario(email) {

        const sql = 'SELECT * FROM usuario where email = $1;';

        const result = await dbcon.query(sql, [email]);
        const usuario = result.rows[0];

        return usuario;

    }

    static async encontrarTimesAdmin(email) {

        const sql = 'SELECT id, nome FROM time where admin = $1;';

        const result = await dbcon.query(sql, [email]);
        const times = result.rows;

        return times;

    }

    static async encontrarTimesMembro(email) {

        const sql = 'SELECT time.id, time.nome FROM time join timeusuario on timeusuario.time = time.id where timeusuario.usuario = $1;';

        const result = await dbcon.query(sql, [email]);
        const times = result.rows;

        return times;

    }

    static async encontrarConvites(email) {

        const sql = 'SELECT time.nome as time_nome, convite.time as time_id FROM convite join time on time.id = convite.time where convite.membro = $1;';

        const result = await dbcon.query(sql, [email]);
        const convites = result.rows;

        return convites;

    }

    static async encontrarEmpresaDoUsuario(email) {

        const sql = 'SELECT empresa.id, empresa.nome FROM usuario join empresa on empresa.id = usuario.empresa where usuario.email = $1;';

        const result = await dbcon.query(sql, [email]);
        const empresa = result.rows[0];

        return empresa;

    }

}

module.exports = {
    Usuario,
    UsuarioDAO
};