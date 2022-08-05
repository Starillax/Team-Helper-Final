const { Client } = require('pg')

const dbcon = new Client({
    connectionString: 'postgres://nveabnqyhfchhi:40ec52e1249bcbf65c0c632d1b331425023d0afeafcc8597b7c785584e5998ae@ec2-52-54-212-232.compute-1.amazonaws.com:5432/d6pmf2ik5ulkij',
    ssl: {
        rejectUnauthorized: false
    }
});

dbcon.connect(err => {
    if (err) {
        console.log("ERRO!!! NÃO FOI POSSÍVEL SE CONECTAR AO BANCO");
        console.log( { err });
    } else {
        console.log("CONEXÃO COM O BANCO BEM SUCEDIDADA");
    }
});

module.exports = {
    dbcon
}