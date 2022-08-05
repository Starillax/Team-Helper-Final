const { dbcon } = require("../config/connection-db");

class Time {
    constructor(id, nome, admin, empresa) {
        this.id = id;
        this.nome = nome;
        this.admin = admin;
        this.empresa = empresa;
    }
}

// DAO = DATA ACCESS OBJECT
class TimeDAO {

    static async cadastrarTime(time) {

        const sql = 'INSERT INTO time (nome, admin, empresa) VALUES ($1, $2, $3);';
        const values = [time.nome, time.admin, time.empresa];

        try {
            await dbcon.query(sql, values);
            console.log('CADASTRO DE TIME BEM-SUCEDIDO!');
        } catch (error) {
            console.log('NÃO FOI POSSÍVEL CADASTRAR O TIME');
            console.log({ error });
        }
        
    }

    static async encontrarMembroTime(time_id, user_email) {

        const sql = 'SELECT * FROM timeusuario where time = $1 AND usuario = $2;';
        const values = [time_id, user_email];

        const result = await dbcon.query(sql, values);
        const membro = result.rows;

        return membro;
        
    }

    static async criarConvite(time_id, user_email) {

        const sql = 'INSERT INTO convite (time, membro) VALUES ($1, $2);';
        const values = [time_id, user_email];

        try {
            await dbcon.query(sql, values);
            console.log('CONVITE ENVIADO COM SUCESSO!');
        } catch (error) {
            console.log('NÃO FOI POSSÍVEL ENVIAR O CONVITE');
            console.log({ error });
        }
        
    }

    static async cadastrarUsuarioNoTime(time_id, user_email) {

        const sql = 'INSERT INTO timeusuario (time, usuario) VALUES ($1, $2);';
        const values = [time_id, user_email];

        try {
            await dbcon.query(sql, values);
            console.log('USER ENTROU NO TIME COM SUCESSO!');

            const sql2 = 'DELETE FROM convite where time = $1 AND membro = $2;';
            await dbcon.query(sql2, values);
        } catch (error) {
            console.log('NÃO FOI POSSÍVEL COLOCAR O USER NO TIME');
            console.log({ error });
        }
        
    }

    static async deletarConvite(time_id, user_email) {

        const sql = 'DELETE FROM convite where time = $1 AND membro = $2;';
        const values = [time_id, user_email];

        try {
            await dbcon.query(sql, values);
            console.log('CONVITE DELETADO COM SUCESSO!');
        } catch (error) {
            console.log('NÃO FOI POSSÍVEL DELETAR O CONVITE');
            console.log({ error });
        }
        
    }

}

module.exports = {
    Time,
    TimeDAO
};